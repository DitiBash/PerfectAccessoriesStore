import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "./productSlice";
import SingleProduct from "./SingleProduct";
import SmallBasket from "../orders/SmallBasket";
import "./ProductsList.css";
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import { addProdToBasket } from "../orders/basketSlice";
import { editProductBymanager } from "../manager/managerSlice";
import useSort from "../../hooks/useSort";
import productSlice from "./productSlice";
import { useNavigate } from "react-router-dom";


const ProductsList = () => {
  let user = useSelector(state => state.user.currentUser);
  let dispatch = useDispatch();
  const arr = useSelector(state => state.product.productArr);
  let [copyArr, setCopyArr] = useState([]);
  let { sort } = useSort(setCopyArr);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [])
  // useEffect(() => {
  //   console.log(copyArr)
  // }, [copyArr])
  useEffect(() => {
    console.log("useeffect copy arr///////////////////////////////")
    let dt = new Date();
    let israeliDate = dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
    setCopyArr(arr.map(item => { return { ...item } }));
  }, [arr])


  return (<><div className="show_products1">
    <input type="button" value="לפי קטגוריה" onClick={() => { sort("category") }} />
    <input type="button" value="לפי מחיר" onClick={() => { sort("price") }} />
    <input type="button" value="לפי תאריך" onClick={() => { sort("date") }} />
    <ul className="show_products">
      {copyArr.map(item => {
        return <li className="liForShowProduct" key={item.id}><SingleProduct details={item} />
        </li>
      })}
    </ul>
  </div>
    <div className="isSmallBasket">
    </div></>);
}



export default ProductsList;