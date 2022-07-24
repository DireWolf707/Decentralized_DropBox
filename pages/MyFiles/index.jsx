import Content from "../../components/ui/Content"
import { useState } from "react"
import { useMoralis } from "react-moralis"

const MyFiles = () => {
  const { user } = useMoralis()
  const [folderId, setFolderId] = useState(user.attributes.rootFolderId)
  return <Content folderId={folderId} setFolderId={setFolderId} />
}

MyFiles.auth = true
export default MyFiles
