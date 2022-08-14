import { Dialog } from "@headlessui/react"
import { PencilIcon, XIcon } from "@heroicons/react/solid"
import ReactDOM from "react-dom"
import { useState } from "react"

const FolderOptions = ({ row }) => {
  return (
    <div className="py-1.5">
      <RenameOption row={row} />
    </div>
  )
}

const RenameOption = ({ row }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className="hover:bg-teal-800 flex items-center w-full space-x-2 px-2 py-1.5 rounded">
        <PencilIcon className="h-5 w-5" />
        <span>Rename</span>
      </button>
      {isModalOpen && <RenameFolder isOpen={isModalOpen} setIsOpen={setIsModalOpen} row={row} />}
    </>
  )
}

const RenameFolder = ({ isOpen, setIsOpen, row }) => {
  const [newName, setNewName] = useState(row.name)

  const renameFolder = async () => {
    console.log("rename")
    setIsOpen(false)
  }

  return ReactDOM.createPortal(
    <Dialog static={true} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 pt-[30vh] p-4">
        <Dialog.Panel className="mx-auto max-w-xl rounded bg-white shadow-2xl">
          <Dialog.Title className="flex justify-between items-center border-b-2 py-2.5 px-3">
            <span className="text-xl text-yellow-900">Rename Folder</span>
            <XIcon onClick={() => setIsOpen(false)} className="h-6 w-6 text-yellow-900" role="button" />
          </Dialog.Title>
          <div className="px-4 py-3 space-y-2">
            <Dialog.Description>
              Renaming folder <span className="font-medium">{row.name}</span> to :
            </Dialog.Description>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              type="text"
              className="w-full border-2 outline-0 rounded-lg py-1 px-1.5"
            />
            <div className="flex justify-end">
              <button
                // disabled={}
                onClick={renameFolder}
                className="bg-green-600 hover:bg-green-700 text-white disabled:bg-blue-900 px-2 py-1.5 rounded"
                type="submit"
              >
                Rename
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.getElementById("__next")
  )
}

export default FolderOptions
