import { Box, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ProductCard from "../../productCard";

// import { Container } from './styles';

function ListProductsOrders({ data }) {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  return (
    <>
      <Button onClick={onToggle} _focus={{ display: "none" }}>
        Itens
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box
          p="40px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
        >
          {data?.dishes?.map((e) => {
            return (
              <ProductCard
                name={e.name}
                price={e.price}
                image={e.image}
                quantity={e.quantity}
                isOrder
              />
            );
          })}
        </Box>
      </Collapse>
    </>
  );
}

export default ListProductsOrders;
