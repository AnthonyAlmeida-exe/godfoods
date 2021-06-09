import React, { useContext, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  useDisclosure,
  Stack,
  Box,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  FormControl,
  Spinner,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { registerUser, login } from "../../lib/auth";
import AppContext from "../../context/AppContext";

function Draw({ name, mobile }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setUser } = useContext(AppContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const appContext = useContext(AppContext);
  const btnRef = React.useRef();

  function onSubmit(data) {
    setLoading(true);
    const { name, email, password } = data;

    registerUser(name, email, password)
      .then((res) => {
        appContext.setUser(res.data.user);
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        onClose();
      });
  }

  function onLogin(data) {
    setLoading(true);
    const { email, password } = data;

    login(email, password)
      .then((res) => {
        setLoading(false);
        appContext.setUser(res.data.user);
      })
      .catch((error) => {
        setLoading(false);
        onClose();
      });
  }
  // useEffect(() => {}, []);

  const Register = (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Crie sua conta</DrawerHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl id="name" isRequired>
                    <FormLabel htmlFor="username">Nome</FormLabel>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Informe seu nome ..."
                      {...register("name")}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Informe seu email principal..."
                        {...register("email")}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="password" isRequired>
                    <FormLabel htmlFor="password">Defina sua Senha</FormLabel>
                    <InputGroup>
                      <Input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Digite uma senha..."
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={loading}
                type="submit"
                spinner={<Spinner color="white" />}
              >
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
  const Login = (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Faça seu Login</DrawerHeader>
          <form onSubmit={handleSubmit(onLogin)}>
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl id="email" isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <InputGroup>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Informe seu email ..."
                        {...register("email")}
                      />
                    </InputGroup>
                  </FormControl>
                </Box>

                <Box>
                  <FormControl id="password" isRequired>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <InputGroup>
                      <Input
                        type="password"
                        id="password"
                        {...register("password")}
                        placeholder="Digite sua senha..."
                      />
                    </InputGroup>
                  </FormControl>
                </Box>
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px" marginTop="15px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                isLoading={loading}
                type="submit"
                spinner={<Spinner color="white" />}
              >
                Submit
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );

  return (
    <>
      {mobile ? (
        <Button
          ref={btnRef}
          variant="link"
          onClick={onOpen}
          variant="solid"
          color="black"
        >
          {name}
        </Button>
      ) : (
        <Button ref={btnRef} variant="link" onClick={onOpen} color="white">
          {name}
        </Button>
      )}

      {name === "Cadastrar" && Register}
      {name === "Login" && Login}
    </>
  );
}
export default Draw;
