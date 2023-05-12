import { useSelector } from "react-redux";
import ProductInBasket from "./ProductInBasket";
import "./basket.css";
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

const Basket = () => {
    let { arrBasket, payment, amount } = useSelector(state => state.basket);
    return (<>
        <div className="basket_show">
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <MDBTypography tag="h3" className="fw-normal mb-0 text-black">
                                    סל קניות           </MDBTypography>
                                <div>
                                    <p className="mb-0">
                                        <span className="text-muted">מיין לפי:</span>
                                        <a href="#!" className="text-body">
                                            מחיר <i className="fas fa-angle-down mt-1"></i>
                                        </a>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <ul>{arrBasket.map(item => <li className="liForShowPritInBasket" key={item.id}><ProductInBasket item={item} /></li>)}</ul>
                            </div>
                            <div className="summary">

                                <h1>לתשלום: ₪{payment}</h1>
                                <h1>כמות: {amount}</h1>
                            </div>
                            <MDBCard className="mb-4">
                                <MDBCardBody className="p-4 d-flex flex-row">
                                    <MDBInput label="קוד קופון" wrapperClass="flex-fill" size="lg" />
                                    <MDBBtn className="ms-3" color="warning" outline size="lg">
                                        החל
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>

                            <MDBCard>
                                <MDBCardBody>
                                    <MDBBtn className="ms-3" color="warning" block size="lg">
                                        לתשלום
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    </>);
}

export default Basket;