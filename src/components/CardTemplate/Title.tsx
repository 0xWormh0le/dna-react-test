import { Input } from "@chakra-ui/react"
import { useCallback, useEffect, useState } from "react"

interface TitleProps {
  value?: string
  onChange?: (value: string) => void
}

const Title: React.FC<TitleProps> = ({ value, onChange }) => {
  const [title, setTitle] = useState(value)

  useEffect(() => {
    setTitle(value)
  }, [value])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setTitle(e.target.value)
    onChange?.(e.target.value)
  }, [onChange])

  return (
    <Input
      value={title}
      onChange={handleChange}
    />
  )
}

export default Title
