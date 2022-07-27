import { motion } from "framer-motion"
import { RefreshIcon, HomeIcon } from "@heroicons/react/solid"
import NewFile from "./subheaderButton/NewFile"
import NewFolder from "./subheaderButton/NewFolder"

const SubHeader = ({ setFolderId, folderId, fetchCurrFolder, rootFolderId }) => {
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
    </div>
  )
}

export default SubHeader
