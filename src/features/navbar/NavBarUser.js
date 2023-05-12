import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { logout, loadUser } from "../user/userSlice";
import { FiLogOut } from 'react-icons/fi';
import { FaCartArrowDown } from 'react-icons/fa';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StorefrontIcon from '@mui/icons-material/Storefront';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import AddOrUpdateProduct  from '../manager/AddOrUpdateProduct';
import SmallBasket from "../orders/SmallBasket";





export default function NavBar() {
  let navigate = useNavigate()
  let disp = useDispatch();

  useEffect(() => {
    console.log("localStorage " + localStorage.getItem("currentUser"));
    if (localStorage.getItem("currentUser") != null)
    disp(loadUser());
}, [])
  // let cUser=localStorage.getItem("currentUser");
  let cUser = useSelector(state => state.user.currentUser);
  console.log("cUser now " + cUser?.name)
  let log = () => {
    disp(logout())
    navigate('/home')

  }
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
  return (
    <><Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
    <Badge color="secondary" badgeContent={2}>
     <FavoriteSharpIcon fontSize="large"/>
    </Badge>
    <Badge color="secondary" badgeContent={0} showZero>
    <ShoppingCartRoundedIcon fontSize="large" />
    {/* <ShoppingCartRoundedIcon fontSize="large" onClick={handleClickOpen}/> */}

    </Badge>
  </Stack>
  {/* <SmallBasket open={open} onClose={handleClose}/> */}

    <nav className='nav-bar'>
      {cUser && cUser.name == "manager" ?
        <>
          <Link className="link2" to='home'>דף הבית </Link>
          <Link className='link2' to='products'>מוצרים </Link>
          <Link className='link2' to='users'>משתמשים </Link>
          <Link className='link2' to='orders'>הזמנות </Link>
          <AddOrUpdateProduct />
          {/* <button onClick={log}>התנתקות  <FiLogOut/></button> */}
          <FiLogOut onClick={log}>התנתקות </FiLogOut>
          <h1>מנהל</h1>
        </> :
        cUser && cUser.name !== "manager" ? <>
          <Link className="link2" to='home'>דף הבית </Link>
          <Link className='link2' to='basket'>סל קניות <FaCartArrowDown/></Link>
          <Link className='link2' to='products'>מוצרים <StorefrontIcon/></Link>
          <Link className='link2' to='orders'>הזמנות </Link>
          <button onClick={
            log}>להתנתקות  <FiLogOut/></button>
          <h1>!{cUser?.name} -שלום</h1>
        </>
          : <>
            <Link className="link2" to='home'>דף הבית </Link>
            {/* <Link className='link2' to='Login'>התחברות </Link>
        <Link className='link2' to='AddUser'>הרשמה </Link> */}
            <Link className='link2' to='products'>מוצרים <StorefrontIcon/></Link>
            <Link className='link2' to='basket'>סל קניות <ShoppingBasketIcon/></Link>
            <h1>אורח</h1>
          </>
      }
    </nav>




    </>
  )
}