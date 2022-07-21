import Content from "../../components/ui/Content"
import { useState } from "react"

const MyFiles = () => {
  const [folderId, setFolderId] = useState(null)
  return (
    <div>
      <Content folderId={folderId} setFolderId={setFolderId} />
    </div>
  )
}

MyFiles.auth = true
export default MyFiles
