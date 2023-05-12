import * as React from 'react';
import { useDispatch } from "react-redux";
import { UpdateOrderDetails, addProdToBasket, removeProdFromBasket, decProductFromBasket } from "./basketSlice"
import "./basket.css";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 6,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 5px',
    },
}));
const ProductInBasket = ({ item }) => {
    const [count, setCount] = React.useState(1);
    let dispatch = useDispatch();
    return (<>
     {/* <div className="basket">
         <h1>{item.name}</h1>
         <img src={item.imgUrl} />
         <Box 
             sx={{
                 color: 'action.active',
                 display: 'flex',
                 flexDirection: 'column',
                 '& > *': {
                     marginBottom: 2,
                 },
                 '& .MuiBadge-root': {
                     marginRight: 4,
                 },
             }}>
             <div>
                 <StyledBadge color="secondary" badgeContent={item.qty}>
                     <ShoppingCartIcon />
                 </StyledBadge><br /><br />
                 <ButtonGroup color="secondary">
                     <Button
                         aria-label="reduce"
                         onClick={() => {
                             dispatch(decProductFromBasket(item.id))
                         }}
                     >
                         <RemoveIcon fontSize="small" />
                     </Button>
                     <Button
                         aria-label="increase"
                         onClick={() => {
                         }} >
                         <AddIcon fontSize="small" />
                     </Button>
                 </ButtonGroup>
           </div>
         </Box>
         <div className="qty_show">
             <IconButton aria-label="cart">
                <Badge badgeContent={item.qty} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton> 
             <p>מחיר ליח': {item.price}<br />סה"כ: {item.price * item.qty}</p>
             <IconButton aria-label="cart"><RemoveShoppingCartIcon onClick={() => {
                 dispatch(removeProdFromBasket(item.id))
             }} /></IconButton><br />מחק מוצר מהסל
         </div> */}
         <MDBCard className="rounded-3 mb-4">
                            <MDBCardBody className="p-4">
                                <MDBRow className="justify-content-between align-items-center">
                                    <MDBCol md="2" lg="2" xl="2">
                                        <MDBCardImage className="rounded-3" fluid
                                            src={item.imgUrl}
                                            alt={item.imgUrl} />
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="3">
                                        <p className="lead fw-normal mb-2">{item.name}</p>
                                        <p>
                                            <span className="text-muted">מחיר ליחידה: </span>₪{item.price}{" "}
                                            <span className="text-muted">Color: </span>Grey
                                        </p>
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="2"
                                        className="d-flex align-items-center justify-content-around">
                                        <ButtonGroup color="secondary">
                                            <Button
                                                aria-label="reduce"
                                                onClick={() => {
                                                    dispatch(decProductFromBasket(item.id))
                                                }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                aria-label="increase"
                                                onClick={() => {
                                                    dispatch(addProdToBasket(item))
                                                }} >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup><br/>
                                        <StyledBadge color="secondary" badgeContent={item.qty}>
                                            <ShoppingCartIcon />
                                        </StyledBadge>

                                    </MDBCol>
                                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                        <MDBTypography tag="h5" className="mb-0">
                                            סכום ביניים
                                            <br /><br />₪ {item.price * item.qty}
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                        <a href="#!" className="text-danger">
                                            <MDBIcon fas icon="trash text-danger" size="lg" onClick={() => {
                                                dispatch(removeProdFromBasket(item.id))
                                            }} />
                                        </a>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
        {/* 
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol md="10">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                                סל קניות           </MDBTypography>
                            <div>
                                <p className="mb-0">
                                    <span className="text-muted">מיין לפי:</span>
                                    <a href="#!" className="text-body">
                                        price <i className="fas fa-angle-down mt-1"></i>
                                    </a>
                                </p>
                            </div>
                        </div>

                        <MDBCard className="rounded-3 mb-4">
                            <MDBCardBody className="p-4">
                                <MDBRow className="justify-content-between align-items-center">
                                    <MDBCol md="2" lg="2" xl="2">
                                        <MDBCardImage className="rounded-3" fluid
                                            src={item.imgUrl}
                                            alt={item.imgUrl} />
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="3">
                                        <p className="lead fw-normal mb-2">{item.name}</p>
                                        <p>
                                            <span className="text-muted">מחיר ליחידה: </span>{item.price}{" "}
                                            <span className="text-muted">Color: </span>Grey
                                        </p>
                                    </MDBCol>
                                    <MDBCol md="3" lg="3" xl="2"
                                        className="d-flex align-items-center justify-content-around">
                                        <ButtonGroup color="secondary">
                                            <Button
                                                aria-label="reduce"
                                                onClick={() => {
                                                    dispatch(decProductFromBasket(item.id))
                                                }}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                aria-label="increase"
                                                onClick={() => {
                                                    dispatch(addProdToBasket(item))
                                                }} >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                        <StyledBadge color="secondary" badgeContent={item.qty}>
                                            <ShoppingCartIcon />
                                        </StyledBadge>

                                    </MDBCol>
                                    <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                        <MDBTypography tag="h5" className="mb-0">
                                            סכום ביניים
                                            <br />{item.price * item.qty}
                                        </MDBTypography>
                                    </MDBCol>
                                    <MDBCol md="1" lg="1" xl="1" className="text-end">
                                        <a href="#!" className="text-danger">
                                            <MDBIcon fas icon="trash text-danger" size="lg" onClick={() => {
                                                dispatch(removeProdFromBasket(item.id))
                                            }} />
                                        </a>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
 */}

        {/* <input type="button" value="הסר" onClick={() => {
            dispatch(removeProdFromBasket(item.id))
        }} /> */}

     {/* </div> */}
    </>);
}

export default ProductInBasket;