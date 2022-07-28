import { useState } from "react"
import { motion } from "framer-motion"
import { RefreshIcon, HomeIcon, DocumentSearchIcon } from "@heroicons/react/solid"
import NewFile from "./subheaderButton/NewFile"
import NewFolder from "./subheaderButton/NewFolder"
import Findfile from "./subheaderButton/FindFile"

const SubHeader = ({ setFolderId, folderId, fetchCurrFolder, rootFolderId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex item-center space-x-2">
      {/* home */}
      <motion.div whileTap={{ scale: 0.75 }}>
        <HomeIcon onClick={() => setFolderId(rootFolderId)} className="h-7 w-7 text-green-300" role="button" />
      </motion.div>
      {/* refresh */}
      <motion.div whileTap={{ rotateZ: -360 }}>
        <RefreshIcon onClick={fetchCurrFolder} className="h-7 w-7 text-indigo-300" role="button" />
      </motion.div>
      {/* new file */}
      <NewFile folderId={folderId} fetchCurrFolder={fetchCurrFolder} />
      {/* new folder  */}
      <NewFolder folderId={folderId} fetchCurrFolder={fetchCurrFolder} />
      {/* find file */}
      <motion.div whileTap={{ scale: 0.75 }}>
        <DocumentSearchIcon onClick={() => setIsModalOpen(true)} className="h-7 w-7 text-pink-200" role="button" />
      </motion.div>
      <Findfile isOpen={isModalOpen} setIsOpen={setIsModalOpen} setFolderId={setFolderId} />
      {/* modal rendered at root node */}
    </div>
  )
}

export default SubHeader
