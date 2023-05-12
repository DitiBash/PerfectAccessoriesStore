import { Link,useNavigate} from "react-router-dom"

import AddUser from "../user/AddUser"
import baner from "../../img/63df798106a74.jpg"
import { GoSignIn } from 'react-icons/go';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Login2 from '../user/Login2';
import Register from '../user/Login2';

import { height } from "@mui/system";



export default function Home(){
  let navigate=useNavigate()
    return <>
    <nav>
      {/* <h1><Link to='addUser'> הרשמה <Register/></Link></h1> 
        <h1><Link to='login'>התחברות <Login/></Link></h1> */}
        {/* <h1><Link to='addUser'> הרשמה <AppRegistrationIcon/></Link></h1> */}
        {/* <h1><Link to='login'>התחברות <GoSignIn/><Login/></Link></h1> */}
      </nav>
      <body>
      <input type="button" value="shop now" className="btnShop" onClick={()=>{navigate('/products')}}/>
      <img className="baner" src={baner}/>
      </body>

    {/* <h1>home</h1> */}

    {/* <AddUser/> */}
    </>
}