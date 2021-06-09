import { Box, Stack } from "@chakra-ui/react";
import * as React from "react";
import Copyright from "./Copyright";

import { SocialMediaLinks } from "./SocialMediaLinks";

const Footer = () => (
  <Box
    as="footer"
    role="contentinfo"
    // mx="auto"
    // maxW="7xl"
    py="12"
    px={{ base: "4", md: "8" }}
    bgColor="#2f956d"
    width="100%"
  >
    <Stack>
      <Stack direction="row" spacing="4" align="center" justify="space-between">
        <img src="/logo.png" alt="Logo" class="tm-site-logo" />
        <SocialMediaLinks />
      </Stack>
      <Copyright alignSelf={{ base: "center", sm: "start" }} />
    </Stack>
  </Box>
);

export default Footer;
