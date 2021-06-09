import {
  Box,
  Button,
  ButtonGroup,
  ButtonGroupProps,
  IconButton,
  Slide,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export const SocialMediaLinks = () => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure();

  // const Slider = (
  //   <Modal isOpen={isOpen} onClose={onClose}>
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>Modal Title</ModalHeader>
  //       <ModalCloseButton />
  //       <ModalBody>
  //         <div
  //           class="LI-profile-badge"
  //           data-version="v1"
  //           data-size="medium"
  //           data-locale="pt_BR"
  //           data-type="vertical"
  //           data-theme="light"
  //           data-vanity="anthony-almeida"
  //         >
  //           <a
  //             class="LI-simple-link"
  //             href="https://br.linkedin.com/in/anthony-almeida?trk=profile-badge"
  //           >
  //             Anthony Almeida
  //           </a>
  //         </div>
  //       </ModalBody>

  //       <ModalFooter>
  //         <Button colorScheme="blue" mr={3} onClick={onClose}>
  //           Close
  //         </Button>
  //         <Button variant="ghost">Secondary Action</Button>
  //       </ModalFooter>
  //     </ModalContent>
  //   </Modal>
  // );

  return (
    <ButtonGroup>
      {/* <Button colorScheme="linkedin" leftIcon={<FaLinkedin />} onClick={onOpen}>
        Linkedin
      </Button> */}

      <IconButton
        as="a"
        href="https://github.com/AnthonyAlmeida-exe/godfoods"
        aria-label="GitHub"
        icon={<FaGithub fontSize="20px" />}
      />
    </ButtonGroup>
  );
};
