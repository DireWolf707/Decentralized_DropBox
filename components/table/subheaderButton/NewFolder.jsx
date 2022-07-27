import { useState } from "react"
import { Popover } from "@headlessui/react"
import { createNewFolder } from "../../../hooks/createNewFolder"
import { FolderAddIcon, FolderIcon } from "@heroicons/react/solid"
import { motion } from "framer-motion"

const Panel = ({ close, folderId, fetchCurrFolder }) => {
  const [newFolderName, setNewFolderName] = useState("")
  const { addFolder } = createNewFolder()

  const addNewFolder = async () => {
    close()
    await addFolder(newFolderName, folderId, fetchCurrFolder)
  }

  return (
    <div className="flex items-center bg-zinc-500 p-2 border rounded border-zinc-900 space-x-2">
      <input
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        type="text"
        className="text-blue-600 p-1 rounded outline-none"
      />
      <motion.div whileTap={{ scale: 0.75 }}>
        <FolderAddIcon onClick={addNewFolder} className="h-7 w-7 text-yellow-300" role="button" />
      </motion.div>
    </div>
  )
}

const NewFolder = ({ folderId, fetchCurrFolder }) => {
  return (
    <Popover className="relative">
      <Popover.Button>
        <motion.div whileTap={{ scale: 0.75 }}>
          <FolderIcon className="h-7 w-7 text-yellow-300" role="button" />
        </motion.div>
      </Popover.Button>

      <Popover.Panel unmount={true} className="absolute z-10">
        {({ close }) => <Panel folderId={folderId} fetchCurrFolder={fetchCurrFolder} close={close} />}
      </Popover.Panel>
    </Popover>
  )
}

export default NewFolder
