// import { ClassNames } from '@emotion/react';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProdToBasket } from '../orders/basketSlice';
import CardActions from '@mui/material/CardActions';
import "./product.css";
import { useState } from "react";
import SmallBasket from '../orders/SmallBasket';
import Button from '@mui/material/Button';
import { selectForEdit, editProductBymanager, removeProduct, deleteProductBymanager } from '../manager/managerSlice'
import { useNavigate } from "react-router-dom";
import { deleteProduct } from './productSlice';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { CardActionArea } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Drawer from '@mui/material/Drawer';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import CancelIcon from '@mui/icons-material/Cancel';

import { FaRegEdit } from 'react-icons/fa';
import AddOrUpdateProduct from '../manager/AddOrUpdateProduct';



const SingleProduct = ({ details }) => {
  let edit = useSelector(st => st.manager.forEdit);
  let user = useSelector(state => state.user.currentUser);
  let dispatch = useDispatch();
  let [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  function onClickAdd(details) {
    dispatch(addProdToBasket(details));
    setFlag(true);
    setTimeout(() => { setFlag(false) }, 500000)
  }
  const onClickEdit = async (item) => {
    console.log('single product onClickEdit');
    localStorage.setItem("currentUpdateProduct", JSON.stringify(item))
    // localStorage.setItem("isEdit", (true))
    await dispatch(selectForEdit(true));
    // dispatch(editProductBymanager(item));
    navigate("/addProduct");
  }
  async function onClickDelete(id) {
    let res = await dispatch(deleteProductBymanager(id))
    let r = await dispatch(deleteProduct(id))
    console.log("---------------------------onClickDelete")
    console.log(res)
    console.log(r)
    // navigate('/products')
  }

  return (<div className="parit_show" onClick={() => {
  }}>

    {user?.name == 'manager' && <CardActions>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" onClick={() => {
          dispatch(onClickDelete(details.id))
        }} startIcon={<DeleteForeverIcon />}>
          מחיקה
        </Button>

      </Stack>
    </CardActions>
    }
    <img src={details.imgUrl} />
    <h1>{details.name}</h1>

    {/* <h2>{details.description}</h2> */}

    <h1>{" ₪ " + details.price}</h1>
    {user?.name == 'manager' && <h5>{details.prodDate ? details.prodDate : details.date}</h5>}

    {user?.name == 'manager' ? <CardActions className="card">
      <AddOrUpdateProduct onClick={() => {
        onClickEdit(details)
      }} />
      {/* <Button
        onClick={() => {
          onClickEdit(details)
        }}
        size="small">עריכה
      </Button> */}
    </CardActions> : <CardActions className="card">
      <AddShoppingCartRoundedIcon
        onClick={() => {
          onClickAdd(details)
        }}
        size="small"> הוסף לסל
      </AddShoppingCartRoundedIcon>
      <Drawer className='drawer' sx={{ width:'100px'}}
        open={flag}
      // onClick={()=>setFlag(false)}
      >
        <CancelIcon fontSize='large' onClick={() => setFlag(false)} />
        <SmallBasket />
      </Drawer>
      {/* {flag && <SmallBasket />} */}
    </CardActions>
    }
  </div>);
}

export default SingleProduct;