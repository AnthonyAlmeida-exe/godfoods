import { Parallax } from "react-parallax";
import { gql } from "apollo-boost";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  createIcon,
  Text,
  Badge,
  Collapse,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ArrowForwardIcon,
  ArrowRightIcon,
} from "@chakra-ui/icons";
import Draw from "../Draw";
import { useContext, useEffect, useRef, useState } from "react";
import AppContext from "../../context/AppContext";
import { logout } from "../../lib/auth";
import Checkout from "../../pages/checkout";
import { useQuery } from "@apollo/react-hooks";
import ProductCard from "../productCard";
import ListProductsOrders from "./ListProductsOrders";

export default function withAction() {
  const { user, setUser, cart, isAuthenticated } = useContext(AppContext);
  const GET_RESTAURANT_DISHES = gql`
query {
  orders(where: {
    
    user: {
      id: "${user?.id}"
    }
  }){
   status
    amount
    dishes
  }
  }
`;

  const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenModalCartEmpty, setIsOpenModalCartEmpty] = useState(false);
  const [isOpenModalOrder, setIsOpenModalOrder] = useState(false);

  const cancelRef = useRef();

  const handleCheckCart = () => {
    if (cart.items.length === 0) {
      setIsOpenModalCartEmpty(true);
    } else {
      setIsOpenCart(true);
    }
  };

  const Alert = (
    <AlertDialog
      isOpen={isOpenAlert}
      leastDestructiveRef={cancelRef}
      onClose={() => setIsOpenAlert(false)}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Encerrar sessão
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza que deseja encerrar sua sessão atual?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => setIsOpenAlert(false)}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                logout();
                setIsOpenAlert(false);
              }}
              ml={3}
            >
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  const ModalCart = (
    <Modal isOpen={isOpenCart} onClose={() => setIsOpenCart(false)} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Carrinho</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Checkout />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
  const order = data?.orders;
  const ModalOrder = (
    <Modal isOpen={isOpenModalOrder} onClose={() => setIsOpenModalOrder(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Seu Pedido</ModalHeader>
        <ModalCloseButton />
        {order?.map((e) => (
          <Flex padding="20px" direction="column">
            <Text fontSize="2xl">
              Status:{" "}
              <Badge colorScheme="green">{e.status.toUpperCase()}</Badge>
            </Text>
            <Text fontSize="2xl">Total: R$ {Number(e.amount + "e-2")}</Text>
            <Text fontSize="2xl">Estimativa: 30 minutos</Text>

            <ListProductsOrders data={e} />
          </Flex>
        ))}
      </ModalContent>
    </Modal>
  );

  // function listProducts(data) {
  //   return (
  //     <Collapse in={isOpen} animateOpacity>
  //       <Box
  //         p="40px"
  //         color="white"
  //         mt="4"
  //         bg="teal.500"
  //         rounded="md"
  //         shadow="md"
  //       >
  //         {data?.dishes?.map((e) => {
  //           return (
  //             <ProductCard
  //               name={e.name}
  //               price={e.price}
  //               image={e.image}
  //               quantity={e.quantity}
  //               isOrder
  //             />
  //           );
  //         })}
  //       </Box>
  //     </Collapse>
  //   );
  // }

  const ModalCartEmpty = (
    <Modal
      isOpen={isOpenModalCartEmpty}
      onClose={() => setIsOpenModalCartEmpty(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Carrinho</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Seu carrinho está vazio. Que tal adicionar alguns itens para você
          poder provar da nossa comida??
          <img src="/emoji.jpg" width="100px" height="100px" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );

  const Carticon = createIcon({
    displayName: "Cart",
    viewBox: "0 0 500 500",
    path: (
      <>
        <path d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0" />
        <path d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
        <path d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0" />
      </>
    ),
  });

  return (
    <>
      <Parallax
        bgImage="/bg.jpg"
        bgImageAlt="Threes"
        style={{ width: "auto", height: "auto" }}
        strength={300}
      >
        <Box px={4}>
          <Flex
            h={16}
            alignItems={"center"}
            height="175px"
            justifyContent={"space-between"}
          >
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
              _focus={{ outline: "none" }}
            />
            <HStack
              spacing={8}
              alignItems={"center"}
              direction="column"
              justifyContent="space-between"
            >
              <Box color="white">
                <img src="/logo.png" alt="Logo" className="tm-site-logo" />
                <div className="tm-site-text-box">
                  <h1 className="tm-site-title">God's Food</h1>
                  <h6 className="tm-site-description">Restaurant</h6>
                </div>
              </Box>
            </HStack>
            <Flex alignItems={"center"}>
              <Box>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {user ? (
                    <>
                      {!user.admin && (
                        <Button
                          leftIcon={<Carticon boxSize={6} marginLeft="5px" />}
                          onClick={handleCheckCart}
                        />
                      )}

                      {data?.orders.length > 0 && (
                        <Button
                          colorScheme="green"
                          variant="solid"
                          color="white"
                          onClick={() => setIsOpenModalOrder(true)}
                        >
                          Pedidos
                        </Button>
                      )}
                      <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={() => setIsOpenAlert(true)}
                        rightIcon={<ArrowForwardIcon />}
                      >
                        Sair
                      </Button>
                    </>
                  ) : (
                    <>
                      <Draw name="Cadastrar" />
                      <Draw name="Login" />
                      <Button
                        variant="link"
                        onClick={handleCheckCart}
                        color="white"
                      >
                        Carrinho
                      </Button>
                    </>
                  )}
                </HStack>
              </Box>
              {ModalCart}
              {ModalCartEmpty}
              {ModalOrder}
            </Flex>
          </Flex>
          {isOpenAlert && Alert}

          {isOpen ? (
            <Box pb={4} display={{ md: "none" }}>
              <Stack as={"nav"} spacing={4}>
                {user ? (
                  <>
                    <Button
                      colorScheme="green"
                      variant="solid"
                      color="white"
                      onClick={() => setIsOpenAlert(true)}
                      rightIcon={<ArrowForwardIcon />}
                    >
                      Logout
                    </Button>
                    <Button
                      leftIcon={<Carticon boxSize={6} marginLeft="5px" />}
                      onClick={handleCheckCart}
                    />
                  </>
                ) : (
                  <>
                    <Flex justifyContent="space-between">
                      <Draw name="Login" mobile />
                      <Draw name="Cadastrar" mobile />
                      <Button
                        leftIcon={<Carticon boxSize={6} marginLeft="5px" />}
                        onClick={handleCheckCart}
                      />
                    </Flex>
                  </>
                )}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Parallax>
    </>
  );
}
