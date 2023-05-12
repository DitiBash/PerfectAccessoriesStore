
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProductInBasket from "./ProductInBasket";
import "./SmallBasket.css";
import ProductSmallBasket from "./ProductSmallBasket";
import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';


const SmallBasket = () => {
        let {payment,amount,arrBasket}=useSelector(state=>state.basket);
        return (<>
         <div className="basketSmall_show">
            <div className="pritimSmall">
            <ul>{arrBasket.map(item=><li className="liForShowPritInBasket" key={item.id}><ProductSmallBasket item={item} /></li>)}</ul>
            </div>
            <div className="summeryBasketSmall">
                <h1>סה"כ לתשלום: {payment}</h1>
                <h1>כמות מוצרים: {amount}</h1>
            </div>
        </div> 

      </>)
}
 
export default SmallBasket;

