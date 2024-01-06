import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Flex } from '@chakra-ui/react';
import { MdDragIndicator } from "react-icons/md";

interface SortableItemsProps {
  children?: React.ReactNode
  id: string
}

const Sortable: React.FC<SortableItemsProps> = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  return (
    <Flex
      ref={setNodeRef}
      alignItems="center"
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      {children}
      <MdDragIndicator color="gray" {...attributes} {...listeners} />
    </Flex>
  );
}

export default Sortable
