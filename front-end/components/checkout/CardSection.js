import React, { useContext } from "react";

import { CardElement } from "@stripe/react-stripe-js";
import AppContext from "../../context/AppContext";
import { Button, Spinner } from "@chakra-ui/react";

function CardSection(props) {
  const { isAuthenticated } = useContext(AppContext);
  return (
    <div>
      <div>
        <label htmlFor="card-element">Cartão de crédito ou débito</label>

        <div>
          <fieldset style={{ border: "none" }}>
            <div className="form-row">
              <div id="card-element" style={{ width: "100%" }}>
                <CardElement
                  options={{
                    style: { width: "100%", base: { fontSize: "18px" } },
                  }}
                />
              </div>
              <br />
              <div className="order-button-wrapper">
                {isAuthenticated ? (
                  <Button
                    colorScheme="blue"
                    isLoading={props.loading}
                    type="submit"
                    spinner={<Spinner color="white" />}
                    onClick={props.submitOrder}
                  >
                    Realizar Pedido!
                  </Button>
                ) : (
                  <button disabled>
                    Retorne para a tela inicial e faça seu login para finalizar
                    o pedido!
                  </button>
                )}
              </div>
              {props.stripeError ? (
                <div>{props.stripeError.toString()}</div>
              ) : null}
              <div id="card-errors" role="alert" />
            </div>
          </fieldset>
        </div>
      </div>
      <style jsx>
        {`
          .order-button-wrapper {
            display: flex;
            width: 100%;
            align-items: flex-end;
            justify-content: flex-end;
          }
        `}
      </style>
    </div>
  );
}
export default CardSection;
