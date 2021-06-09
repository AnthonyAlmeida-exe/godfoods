import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useContext } from "react";
import { gql } from "apollo-boost";
import AppContext from "../context/AppContext";

import ProductCard from "../components/productCard";
import {
  Box,
  Heading,
  Text,
  Wrap,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import AdminPage from "../components/AdminPage";

const GET_RESTAURANT_DISHES = gql`
  query {
    products {
      name
      category
      price
      image {
        url
      }
    }
  }
`;

function Home() {
  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES);

  const { user, setUser, cart, isAuthenticated, addItem } = useContext(
    AppContext
  );

  return (
    <>
      {user && user.admin ? (
        <AdminPage />
      ) : (
        <Flex direction="column">
          <Box maxW="32rem" padding="20px" alignSelf="center">
            <Heading align="center" mb={4}>
              Bem vindo ao God's Food!
            </Heading>
            <Text fontSize="sm" align="center">
              Melhores pizzas e pratos tradicionais da região, veja nosso
              cardápio e prove da nossa comida divina!
            </Text>
          </Box>

          <Tabs isFitted variant="line">
            <TabList mb="1em" color="#2f956d" _focus={{ outline: "none" }}>
              <Tab _focus={{ outline: "none" }}>Pizzas</Tab>
              <Tab _focus={{ outline: "none" }}> Sandwiches</Tab>
              <Tab isDisabled>Bebidas</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Wrap
                  spacing="15px"
                  justify="center"
                  shouldWrapChildren
                  direction="row"
                  margin="0"
                >
                  {data &&
                    data.products.map((e) => {
                      if (e.category === "pizza") {
                        return (
                          <ProductCard
                            name={e.name}
                            description={e.description}
                            price={e.price}
                            image={e.image}
                            onClick={() => addItem(e)}
                            key={e.name}
                          />
                        );
                      }
                    })}
                </Wrap>

                {error && <div> Houve algum erro ao buscar os produtos!</div>}
              </TabPanel>
              <TabPanel>
                <Wrap
                  spacing="15px"
                  justify="center"
                  shouldWrapChildren
                  direction="row"
                  margin="0"
                >
                  {data &&
                    data.products.map((e) => {
                      if (e.category === "sandwiche") {
                        return (
                          <ProductCard
                            name={e.name}
                            description={e.description}
                            price={e.price}
                            image={e.image}
                            onClick={() => addItem(e)}
                            key={e.name}
                          />
                        );
                      }
                    })}
                </Wrap>

                {error && <div> Houve algum erro ao buscar os produtos!</div>}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      )}
    </>
  );
}
export default Home;
