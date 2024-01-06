import React from "react"
import { Box, Text, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { useDraggable } from "@dnd-kit/core";

interface ElementProps {
  icon: IconType
  id: string
  title: string
}

const Element: React.FC<ElementProps> = ({ icon, title, id }) => {
  const {attributes, listeners, setNodeRef} = useDraggable({ id });

  return (
    <Box
      ref={setNodeRef}
      _hover={{ bgColor: 'gray.100' }}
      width="full"
      textAlign="center"
      p={2}
      {...listeners}
      {...attributes}
    >
      <Icon as={icon} boxSize={10} color="gray.500" display="block" m="auto" />
      <Text px={3} fontSize="sm">{title}</Text>
    </Box>
  )
}

export default Element
