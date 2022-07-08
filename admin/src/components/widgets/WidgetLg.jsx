import'./widgetLg.css'
import { useState, useEffect } from 'react'
import dateFormat from 'dateformat'
import { userRequest } from '../../requestMethods'

const WidgetLg = () => {
    const [message, setMessage] = useState('')
    const [status, setSelect] = useState('')
    const [idOrder, setID] = useState('')    
    const [orders, setOrders] = useState([])
    
    useEffect(() => {  
      const getOrders = async () => {
        await userRequest.get('/orders').then((res) => {
          setOrders(res.data)
        }).catch((err) => {
          console.log(err)
        })
      }
      getOrders()
    },[])

    const eventSubmit = async () => { 
      let result
      if(status === 'approved'){
        result = {status: status}
      }else{
        result = {feedback:message, status}
      }
      console.log(result)
      await userRequest.put(`/orders/${idOrder}`, result).then((res) => {
        console.log(res.data)
        window.location.reload(true)
      }).catch((err) => {
        console.log(err)
      })
    }

 

    const formFeed = (<>
      <div>
        <div class="d-flex justify-content-center mt-5">
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Return to client:</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="md-form mb-4 pink-textarea active-pink-textarea-2">
                    <i class="fas fa-angle-double-right prefix"></i>
                    <label for="form23">Set new message...</label>
                    <textarea 
                      id="form23" 
                      class="md-textarea form-control" 
                      rows="3" 
                      placeholder='write were...'
                      onChange={(e) => setMessage(e.target.value)}/>
                  </div>
                  <select  
                    class="custom-select" name='validate' 
                    onChange={(e) => setSelect(e.target.value)}
                    style={{width: '110px',height: '40px'}}>
                    <option selected>pending</option>
                    <option value='declined' for='validate'>declined</option>
                    <option value='approved'for='validate'>approved</option>
                  </select>
                </div>
                <div class="modal-footer">
                    <button 
                      type="button" 
                      class="btn btn-primary" 
                      data-dismiss="modal" 
                      onClick={eventSubmit}>Send Message
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>)
    const Button = ({type}) => {
        return <button className={'widgetLgButton '+type}>{type}</button>
    }
    return (
      <div className='widgetLg'>
        <h3 className="widgetLgTitle">Latest Transactions </h3>
        <table className="table table-borderless">
          <thead>
            <tr>
              <th scope="col">#ID</th>
              <th scope="col">Date</th>
              <th scope="col">Hours</th>
              <th scope="col">Amount</th>
              <th scope="col">Status</th>
              <th scope="col">Feedback</th>
            </tr> 
          </thead>
          {orders.map((order) => (
          <tbody>
            <tr >
              <th key={order._id}>{order.userId}</th>
              <td className="widgetLgDate">{dateFormat(order.createdAt, "mmmm dS, yyyy")}</td>
              <td className="widgetLgDate">{dateFormat(order.createdAt, "h:MM:ss TT")}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus"><Button type={order.status}/></td>
              <td>
                {order.status === 'pending'
                  ?
                  <button 
                  data-toggle="modal" 
                  data-target="#exampleModal" 
                  value={order._id}
                  className='btnFeed'
                  onClick={(e) => setID(e.target.value)}> Return to client      
                </button>
                :  
                <button 
                  data-toggle="modal" 
                  data-target="#exampleModal" 
                  value={order._id}
                  className='btnFeedbg'
                  onClick={(e) => setID(e.target.value)}> Return to client      
                </button>
              }
              </td>
            </tr>
          </tbody>
          ))}
          {formFeed}
        </table>
      </div>
    )
}

export default WidgetLg