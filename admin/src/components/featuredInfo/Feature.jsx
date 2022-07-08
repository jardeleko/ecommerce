import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { userRequest } from '../../requestMethods'
import { useState,useEffect } from 'react'
import './feature.css'

const Feature = () => {
    const [actual, setActual] = useState(0)
    const [prv, setPrev] = useState(0)
    const [perc, setPerc] = useState(0)
    const [mean, setMean] = useState(0)
    const [perc2, setPerc2] = useState(0)

    useEffect(() => {
        const getIncome = async () => {
            await userRequest.get('/orders/income').then((res) => {
                let d = new Date()
                let n1 = d.getMonth()+1
                let n2 = n1-1
                let n3 = n2-1
                const actual = res.data.filter((item) => parseInt(item._id) === parseInt(n1))
                const prev = res.data.filter((item) => parseInt(item._id) === parseInt(n2))
                const prev2 = res.data.filter((item) => parseInt(item._id) === parseInt(n3))
                let r1 = []
                let r2 = []
                let r3 = []
                let r4 = []
                r1.push(actual.map((value) => value.total))
                setActual(r1)
                r2.push(prev.map((value) => value.total))
                setPrev(r2)
                r3.push(prev2.map((value) => value.total))
                setPerc(r1[0]*100/r2[0]-100)
                setPerc2(r2[0]*100/r3[0]-100)
                r4 = ((r1[0]/3)+(r2[0]/3)+(r3[0]/3))
                setMean(r4)
            }).catch((error) => {
                console.log(error)
            })
        }
        getIncome()
    }, [])
    
  return (
    <div className='featured'>
        <div className="featuredItem">
            <span className="featuredTitle" id="sales">Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">${(actual)}</span>
                <span className="featuredMoneyRate">
                    {(perc).toFixed(2)}% {" "} {perc < 0 ? (
                        <ArrowDownward className='featuredIcon negative'/>
                      ) : ( <ArrowUpward className='featuredIcon'/>
                    )} 
                </span>
            </div>
            <span className="featuredSub">Compared to last month</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Last Month</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">$
                {prv}
                </span>
                <span className="featuredMoneyRate">
                    {(perc2).toFixed(2)}% {" "} {perc2 < 0 ? (
                        <ArrowDownward className='featuredIcon negative'/>
                      ) : ( <ArrowUpward className='featuredIcon'/>
                    )}
                </span>
            </div>
            <span className="featuredSub">Compared to other</span>
        </div>
        <div className="featuredItem">
            <span className="featuredTitle">Mean Sales</span>
            <div className="featuredMoneyContainer">
                <span className="featuredMoney">${(mean).toFixed(2)}</span>
            </div>
            <span className="featuredSub">Based to last 3 month</span>
        </div>
    </div>
  )
}

export default Feature