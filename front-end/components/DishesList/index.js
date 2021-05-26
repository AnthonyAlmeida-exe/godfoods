import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { gql } from "apollo-boost";
import Cart from "../carts/Cart";
import AppContext from "../../context/AppContext";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const GET_RESTAURANT_DISHES = gql`
  query {
    dishes {
      id
      name
      description
      price
      image {
        url
      }
    }
  }
`;

function RestaurantList(props) {
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES);
  const appContext = useContext(AppContext);
  console.log(data, error);
  if (error) return "Error loading dishes";
  //if restaurants are returned from the GraphQL query, run the filter query
  //and set equal to variable restaurantSearch
  if (loading) return <h1>Fetching</h1>;
  if (data.dishes && data.dishes.length) {
    //searchQuery

    return (
      <Row>
        {data.dishes.map((res) => (
          <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
            <Card style={{ margin: "0 10px" }}>
              <CardImg
                top={true}
                style={{ height: 250 }}
                src={
                  process.env.NODE_ENV === "production"
                    ? res.image.url
                    : `${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`
                }
              />
              <CardBody>
                <CardTitle>{res.name}</CardTitle>
                <CardText>{res.description}</CardText>
              </CardBody>
              <div className="card-footer">
                <Button
                  outline
                  color="primary"
                  onClick={() => appContext.addItem(res)}
                >
                  + Add To Cart
                </Button>

                <style jsx>
                  {`
                    a {
                      color: white;
                    }
                    a:link {
                      text-decoration: none;
                      color: white;
                    }
                    .container-fluid {
                      margin-bottom: 30px;
                    }
                    .btn-outline-primary {
                      color: #007bff !important;
                    }
                    a:hover {
                      color: white !important;
                    }
                  `}
                </style>
              </div>
            </Card>
          </Col>
        ))}
        <Col xs="3" style={{ padding: 0 }}>
          <div>
            <Cart />
          </div>
        </Col>
      </Row>
    );
  } else {
    return <h1>No Dishes Found</h1>;
  }
}

export default RestaurantList;
