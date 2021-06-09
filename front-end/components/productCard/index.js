import React from "react";
import { Box } from "@chakra-ui/react";

function productCard({
  name,
  image,
  description,
  price,
  onClick,
  quantity,
  isOrder,
}) {
  return (
    <Box w="280px" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box width="280px" height="180px">
        <img src={image.url} style={{ width: "auto", height: "auto" }} />
      </Box>

      <Box p="6">
        <Box
          mt="1"
          fontWeight="semi-bold"
          as="h1"
          lineHeight="tight"
          isTruncated
          fontFamily="cursive"
        >
          {name}
        </Box>

        <Box fontFamily="cursive">R${price}</Box>
        {/* <Box d="flex" mt="2" justifyContent="space-between">
          <Box
            as="button"
            borderRadius="md"
            bg="white"
            color="#2f956d"
            className="tm-paging-item"
            flex="0.6"
            h={14}
            _hover={{
              backgroundColor: "#2f956d",
              color: "white",
              transition: "all 1s",
            }}
          >
            Ingredientes
          </Box>
          <Box
            as="button"
            borderRadius="md"
            bg="white"
            color="#2f956d"
            className="tm-paging-item"
            flex="0.6"
            h={14}
            _hover={{
              backgroundColor: "#2f956d",
              color: "white",
              transition: "all 1s",
            }}

            // onClick={onClick}
          >
            Adicionar
          </Box>
        </Box> */}
        {isOrder ? (
          <Box fontFamily="cursive">{quantity}X</Box>
        ) : (
          <Box
            as="button"
            borderRadius="md"
            bg="white"
            color="#2f956d"
            width="100%"
            h={14}
            _hover={{
              backgroundColor: "#2f956d",
              color: "white",
              transition: "all 1s",
            }}
            onClick={onClick}
          >
            Adicionar ao carrinho
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default productCard;
