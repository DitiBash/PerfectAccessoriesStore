import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useDispatch} from "react-redux";
import {addProdToBasket,decProductFromBasket,removeProdFromBasket}from './basketSlice';
import "./ProductSmallBasket.js"






const ProductSmallBasket = ({item}) => {
    // const theme = useTheme();
    let dispatch=useDispatch();
    return(<Card sx={{ display: 'flex', pl: 4, pb: 1, pr:5 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column'}} className="small_product">
        <CardMedia
        component="img"
        sx={{ width: 151}}
        image={item.imgUrl}
        />
        <CardContent sx={{ flex: '1 0 auto'}}>
          <Typography sx={{ fontSize: 14 }}component="div" variant="h6" color="black">
          {item.name}
          </Typography>
          <Typography sx={{ fontSize: 14 }}variant="subtitle1" color="red" component="div">
          מחיר:{item.price} ש"ח  
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1, pr:4 }}>
          <input type="button"onClick={()=>{  
            dispatch(addProdToBasket(item))}}value="+"/>
        <input type="button"value={item.qty}/>
        <input type="button"onClick={()=>{
            dispatch(decProductFromBasket(item.id))}}value="-"/>
        <input type="button"value="del"onClick={()=>{dispatch(removeProdFromBasket(item.id))}}/>
        </Box>
      </Box>
      
    </Card>
  );
}
 
export default ProductSmallBasket;




         


 

