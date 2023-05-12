import { Link } from "react-router-dom"

export default function NavBar(){
    return <nav>
    <Link to='home'>דף הבית</Link>
    <Link to='product'> רשימת המוצרים שלנו:</Link>
    <Link to='about'>דף אודות</Link>
    <Link to='basket'> קניות</Link>
    {/* <Link to='addProduct'>לדף הוספת מוצר</Link>  */}
    <Link to='EnterManager'>כניסת מנהל</Link>


  </nav>
}