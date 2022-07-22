import { createNewFolder } from "../../hooks/createNewFolder"
import { useState } from "react"
import { FolderAddIcon, RefreshIcon, HomeIcon, DocumentAddIcon, FolderIcon, DocumentTextIcon } from "@heroicons/react/solid"
import { useMoralis } from "react-moralis"
import { motion } from "framer-motion"
import { Popover } from "@headlessui/react"

const SubHeader = ({ setFolderId, folderId, fetchCurrFolder }) => {
  const [newFolderName, setNewFolderName] = useState("")
  const { addFolder } = createNewFolder()
  const { user } = useMoralis()

  const addNewFolder = async (close) => {
    close()
    setNewFolderName("")
    await addFolder(newFolderName, folderId)
    await fetchCurrFolder()
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex item-center space-x-2">
        <motion.div whileTap={{ scale: 0.75 }}>
          <HomeIcon onClick={() => setFolderId(user.attributes.rootFolderId)} className="h-7 w-7 text-green-300" role="button" />
        </motion.div>
        <motion.div whileTap={{ rotateZ: -360 }}>
          <RefreshIcon onClick={() => fetchCurrFolder()} className="h-7 w-7 text-indigo-400" role="button" />
        </motion.div>
        <motion.div whileTap={{ scale: 0.75 }}>
          <DocumentTextIcon className="h-7 w-7 text-slate-200" role="button" />
        </motion.div>

        <Popover className="relative">
          <Popover.Button>
            <motion.div whileTap={{ scale: 0.75 }}>
              <FolderIcon className="h-7 w-7 text-yellow-300" role="button" />
            </motion.div>
          </Popover.Button>

          <Popover.Panel className="absolute z-10">
            {({ close }) => (
              <div className="flex items-center bg-zinc-500 p-2 border rounded border-zinc-900 space-x-2">
                <input
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  type="text"
                  className="text-blue-600 p-1 rounded outline-none"
                />
                <motion.div whileTap={{ scale: 0.75 }}>
                  <FolderAddIcon onClick={()=>addNewFolder(close)} className="h-7 w-7" role="button" />
                </motion.div>
              </div>
            )}
          </Popover.Panel>
        </Popover>
      </div>
      <div>Search</div>
    </div>
  )
}

export default SubHeader
