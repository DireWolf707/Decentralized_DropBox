import { createNewFolder } from "../../hooks/createNewFolder"
import { createNewFile } from "../../hooks/createNewFile"
import { useState } from "react"
import { FolderAddIcon, RefreshIcon, HomeIcon, DocumentAddIcon, FolderIcon, DocumentTextIcon } from "@heroicons/react/solid"
import { useMoralis } from "react-moralis"
import { motion } from "framer-motion"
import { Popover } from "@headlessui/react"

const SubHeader = ({ setFolderId, folderId, fetchCurrFolder }) => {
  const [newFolderName, setNewFolderName] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  const { addFolder } = createNewFolder()
  const { addFile } = createNewFile()
  const { user } = useMoralis()

  const addNewFolder = async (close) => {
    close()
    setNewFolderName("")
    await addFolder(newFolderName, folderId)
    await fetchCurrFolder()
  }

  const addNewFile = async (close) => {
    close()
    setSelectedFile(null)
    await addFile(selectedFile, folderId)
    await fetchCurrFolder()
  }

  return (
    <div className="flex justify-between w-full">
      <div className="flex item-center space-x-2">
        <motion.div whileTap={{ scale: 0.75 }}>
          <HomeIcon onClick={() => setFolderId(user.attributes.rootFolderId)} className="h-7 w-7 text-green-300" role="button" />
        </motion.div>

        <motion.div whileTap={{ rotateZ: -360 }}>
          <RefreshIcon onClick={() => fetchCurrFolder()} className="h-7 w-7 text-indigo-300" role="button" />
        </motion.div>

        <Popover className="relative">
          <Popover.Button>
            <motion.div whileTap={{ scale: 0.75 }}>
              <DocumentTextIcon className="h-7 w-7 text-slate-300" role="button" />
            </motion.div>
          </Popover.Button>

          <Popover.Panel className="absolute -left-1 z-10">
            {({ close }) => (
              <div className="flex items-center space-x-2 bg-zinc-500 py-2 p-3 border rounded-full border-zinc-900">
                <input
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  type="file"
                  className="text-sm file:mr-5 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                />
                <motion.div whileTap={{ scale: 0.75 }}>
                  <DocumentAddIcon
                    onClick={() => addNewFile(close)}
                    className="h-9 w-9 text-white bg-slate-400 p-1 rounded-full"
                    role="button"
                  />
                </motion.div>
              </div>
            )}
          </Popover.Panel>
        </Popover>

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
                  <FolderAddIcon onClick={() => addNewFolder(close)} className="h-7 w-7 text-yellow-300" role="button" />
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
