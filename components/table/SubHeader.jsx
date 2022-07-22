import { createNewFolder } from "../../hooks/createNewFolder"
import { useState } from "react"
import { FolderAddIcon, RefreshIcon, HomeIcon, DocumentAddIcon } from "@heroicons/react/solid"
import { useMoralis } from "react-moralis"
import { motion } from "framer-motion"

const SubHeader = ({ setFolderId, fetchCurrFolder }) => {
  const [newFolderName, setNewFolderName] = useState("")
  const { addFolder, loading: folderLoading } = createNewFolder()
  const { user } = useMoralis()
  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-2">
        <motion.div whileTap={{ scale: 0.75 }}>
          <HomeIcon onClick={() => setFolderId(user.attributes.rootFolderId)} className="h-7 w-7" role="button" />
        </motion.div>
        <motion.div whileTap={{ rotateZ: -180 }}>
          <RefreshIcon onClick={() => fetchCurrFolder()} className="h-7 w-7" role="button" />
        </motion.div>
        <motion.div whileTap={{ scale: 0.75 }}>
          <DocumentAddIcon className="h-7 w-7" role="button" />
        </motion.div>
        <form>
          {/* <input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} type="text" className="text-black" /> */}
          <FolderAddIcon
            disabled={folderLoading}
            onClick={async (e) => {
              e.preventDefault()
              await addFolder(newFolderName, folderId)
              await fetchContent(folderId)
            }}
            className="h-7 w-7"
            role="button"
          />
        </form>
      </div>
      <div>Search</div>
    </div>
  )
}

export default SubHeader
