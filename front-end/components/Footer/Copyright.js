import { Text, TextProps } from "@chakra-ui/layout";
import * as React from "react";

const Copyright = () => (
  <Text fontSize="sm" color="whiteAlpha.800">
    &copy; {new Date().getFullYear()} God's Food, Inc. All rights reserved.
  </Text>
);

export default Copyright;
