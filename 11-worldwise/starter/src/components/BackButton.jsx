import { useNavigate } from "react-router-dom"
import Button from "./Button"

function BackButton({children}) {
    const navigate=useNavigate()
    return (
        <Button 
        onClick={(e)=>{
            e.preventDefault() // I added the prevent default because the button is inside the form, therefore, it will cause the form to be submitted.
            navigate(-1)
        }} type="back">{children}</Button>
    )
}

export default BackButton
