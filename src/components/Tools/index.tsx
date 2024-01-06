import React from 'react'
import { Text, VStack } from '@chakra-ui/react'
import { MdOutlineTitle } from "react-icons/md"
import { IconType } from 'react-icons';
import { IoMdText } from "react-icons/io"
import { BsFillImageFill } from "react-icons/bs";
import Element from '../Element'

export const elements: Record<string, [string, IconType]> = {
  image: ["Image", BsFillImageFill],
  title: ["Title", MdOutlineTitle],
  description: ["Description", IoMdText]
}

const Tools: React.FC = () => (
  <VStack
    borderRadius="lg"
    overflow="hidden"
    border={1}
    borderStyle="solid"
    borderColor="gray.200"
    boxShadow="lg"
    spacing={0}
  >
    <Text
      px="3"
      py="2"
      bgColor="gray.100"
      borderRadius="md"
      borderBottomRadius={0}
      width="full"
      textAlign="center"
      fontWeight="bold"
      color="gray.500"
    >
      Tools
    </Text>
    <VStack spacing={0}>
      {Object.entries(elements).map(([key, [title, icon]]) => (
        <Element title={title} icon={icon} id={key} key={key} />
      ))}
    </VStack>
  </VStack>
)

export default Tools
