import { useCallback, useEffect, useState } from "react"
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg"

interface TitleProps {
  value?: string
  onChange?: (value: string) => void
}

const Description: React.FC<TitleProps> = ({ value, onChange }) => {
  const [desc, setDesc] = useState(value)

  useEffect(() => {
    setDesc(value)
  }, [value])

  const handleChange = useCallback((e: ContentEditableEvent) => {
    setDesc(e.target.value)
    onChange?.(e.target.value)
  }, [onChange])

  return (
    <Editor
      value={desc}
      onChange={handleChange}
      containerProps={{ style: { width: '100%' } }}
    />
  )
}

export default Description
