import { useLocation } from "react-router";


const Success =() => {
    const location = useLocation()
    console.log(location)
    
    return(
        <div>
            successFull
        </div>
    )
}

export default Success;