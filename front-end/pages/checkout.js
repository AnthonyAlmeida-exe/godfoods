import React from "react";

import { Row, Col } from "reactstrap";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import InjectedCheckoutForm from "../components/checkout/CheckoutForm";

import Cart from "../components/carts/Cart";

function Checkout() {
  // load stripe to inject into elements components
  const stripePromise = loadStripe(
    "pk_test_51IunD1IDzFABJACH3VCoGSvMqxtpbRedI7htf5KXNVOwjJl0EHfK1vWiEJThmE2utRRdQR0qWZZ3pPSu6ty9yo9e00fR1yFp71"
  );

  return (
    <Row>
      <Col>
        <Cart />
      </Col>
      <Col>
        <Elements stripe={stripePromise}>
          <InjectedCheckoutForm />
        </Elements>
      </Col>
    </Row>
  );
  // }
}
export default Checkout;
