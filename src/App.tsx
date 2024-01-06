import React, { useState, useCallback, useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { v4 as uuid } from 'uuid';
import debounce from 'debounce';
import Tools from './components/Tools'
import CardTemplate, { CardTemplateProps, TemplateItem } from './components/CardTemplate'
import { Draggable } from './components/Element';
import { elements } from './components/Tools';
import * as firestore from './firestore';

const write = debounce(firestore.write, 500)

const App: React.FC = () => {
  const [content, setContent] = useState<TemplateItem[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier>()
  const pointerSensor = useSensor(PointerSensor);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  
  const sensors = useSensors(
    pointerSensor,
    mouseSensor,
    touchSensor,
    keyboardSensor,
  );

  const handleDragEnd = useCallback(({ active, over }: DragEndEvent) => {
    if (active.id in elements) {
      if (over?.id === "template") {
        if (active.id === "description") {
          setContent(prev => prev.concat({ id: uuid(), type: "description", content: "" }))
        } else if (active.id === "title") {
          setContent(prev => prev.concat({ id: uuid(), type: "title", content: "" }))
        } else {
          setContent(prev => prev.concat({ id: uuid(), type: "image", content: [100, 100] }))
        }
      }
    } else if (over === null) {
      setContent(prev => prev.filter(item => item.id !== active.id))
    } else {
      setContent(prev => {
        const oldIndex = prev.findIndex(value => value.id === active.id);
        const newIndex = prev.findIndex(value => value.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      })
    }
  }, [])

  const handleValueChange = useCallback<CardTemplateProps['onValueChange']>(
    (id, data) => {
      const val = content.map(item => item.id === id ? ({ ...item, content: data }) : item)
      setContent(val as TemplateItem[])
    },
    [content]
  )

  useEffect(() => {
    firestore.read().then(val => {
      if (val && val.data && Array.isArray(val.data)) {
        setContent(val.data)
      }
    })
  }, [])

  useEffect(() => {
    write(content)
  }, [content])

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={e => setActiveId(e.active.id)}
    >
      <Flex alignItems="start">
        <SortableContext items={['image', 'title', 'description']} id="tools">
          <Tools />
        </SortableContext>
        <SortableContext
          items={content}
          strategy={verticalListSortingStrategy}
        >
          <CardTemplate
            mx="auto"
            items={content}
            onValueChange={handleValueChange}
          />
        </SortableContext>
        <DragOverlay>
          {activeId && (
            activeId in elements ? (
              <Draggable title={elements[activeId][0]} icon={elements[activeId][1]} />
            ) : (
              <Text
                p={2}
                bgColor="white"
                boxShadow="xl"
                cursor="grabbing"
                zIndex={9}
                fontSize="small"
                borderRadius="lg"
                w="60"
              >
                Move vertially to reorder or outside the template to remove
              </Text>
            )
          )}
        </DragOverlay>
      </Flex>
    </DndContext>
  )
}

export default App
