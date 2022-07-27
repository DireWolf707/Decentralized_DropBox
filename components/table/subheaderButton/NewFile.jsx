import { useState } from "react"
import { DocumentAddIcon, DocumentTextIcon } from "@heroicons/react/solid"
import { createNewFile } from "../../../hooks/createNewFile"
import { Popover } from "@headlessui/react"
import { motion } from "framer-motion"

const Panel = ({ close, folderId, fetchCurrFolder }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const { addFile } = createNewFile()

  const addNewFile = async () => {
    close()
    await addFile(selectedFile, folderId, fetchCurrFolder)
  }

  return (
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
        <DocumentAddIcon onClick={addNewFile} className="h-9 w-9 text-white bg-slate-400 p-1 rounded-full" role="button" />
      </motion.div>
    </div>
  )
}

const NewFile = ({ folderId, fetchCurrFolder }) => {
  return (
    <Popover className="relative">
      <Popover.Button>
        <motion.div whileTap={{ scale: 0.75 }}>
          <DocumentTextIcon className="h-7 w-7 text-slate-300" role="button" />
        </motion.div>
      </Popover.Button>

      <Popover.Panel unmount={true} className="absolute -left-1 z-10">
        {({ close }) => <Panel folderId={folderId} fetchCurrFolder={fetchCurrFolder} close={close} />}
      </Popover.Panel>
    </Popover>
  )
}

export default NewFile
