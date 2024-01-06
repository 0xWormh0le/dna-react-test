import { VStack, BoxProps, Box, Text } from "@chakra-ui/react"
import { useDroppable } from "@dnd-kit/core"
import Sortable from "../Sortable"
import CoverImage from "./CoverImage"
import Description from "./Description"
import Title from "./Title"
import "react-resizable/css/styles.css"

export type TemplateItem = {
  id: string
  type: 'image'
  content?: [number, number]
} | {
  id: string
  type: 'title' | 'description'
  content: string
}

export interface CardTemplateProps extends BoxProps {
  items: TemplateItem[]
  onValueChange: (id: string, data?: string | [number, number]) => void
}


const CardTemplate: React.FC<CardTemplateProps> = ({ items, onValueChange, ...props }) => {
  const { isOver, setNodeRef } = useDroppable({ id: 'template' })

  return (
    <Box
      p="2"
      boxShadow="2xl"
      borderRadius="xl"
      overflow="hidden"
      {...props}
    >
      <VStack
        ref={setNodeRef}
        borderColor={isOver ? 'green' : "white"}
        borderStyle="dashed"
        borderWidth={2}
      >
        {items.length === 0 ? (
          <Text
            p={8}
            color="gray.400"
            bgColor={isOver ? 'green.50' : undefined}
          >
            Drop your item here
          </Text>
        ) : items.map(item => (
          <Sortable key={item.id} id={item.id}>
            {item.type === 'image' ? (
              <CoverImage
                width={item.content?.[0]}
                height={item.content?.[1]}
                onChange={(w, h) => onValueChange(item.id, [w, h])}
              />
            ) : item.type === 'title' ? (
              <Title value={item.content} onChange={value => onValueChange(item.id, value)} />
            ) : (
              <Description value={item.content} onChange={value => onValueChange(item.id, value)} />
            )}
          </Sortable>
        ))}
      </VStack>
    </Box>
  )
}

export default CardTemplate
