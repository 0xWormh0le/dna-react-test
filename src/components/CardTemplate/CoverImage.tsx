import React, { useCallback, useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { Resizable, ResizeCallbackData } from "react-resizable";

interface CoverImageProps {
  onChange?: (w: number, h: number) => void
  width?: number
  height?: number
}

const CoverImage: React.FC<CoverImageProps> = ({ width, height, onChange }) => {
  const [[w, h], setSize] = useState<[number, number]>([width ?? 100, height ?? 100])

  useEffect(() => {
    setSize([width ?? 100, height ?? 100])
  }, [width, height])

  const handleSizeChange = useCallback(
    (_e: React.SyntheticEvent, data: ResizeCallbackData) => {
      setSize([data.size.width, data.size.height])
      onChange?.(data.size.width, data.size.height)
    },
    [onChange]
  )

  return (
    <Resizable
      width={w}
      height={h}
      onResize={handleSizeChange}
    >
      <div>
        <Image src='https://bit.ly/dan-abramov' alt='Dan Abramov' w={w} height={h} />
      </div>
    </Resizable>
  )
}

export default CoverImage
