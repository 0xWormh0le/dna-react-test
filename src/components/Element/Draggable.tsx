import React from "react";
import { HStack, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface DraggableProps {
  icon: IconType
  title: string
}

const Draggable: React.FC<DraggableProps> = ({ icon, title }) => (
  <HStack
    cursor="grabbing"
    zIndex={9}
    borderRadius="lg"
    borderStyle="solid"
    borderWidth={2}
    bgColor="white"
    boxShadow="xl"
    w="max-content"
    p={2}
  >
    <Icon as={icon} boxSize={10} color="gray.500" display="block" m="auto" />
    <Text>{title}</Text>
  </HStack>
)

export default Draggable
