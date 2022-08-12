import { Dialog, Menu } from "@headlessui/react"
import { PencilIcon } from "@heroicons/react/solid"
import ReactDOM from "react-dom"
import { useState } from "react"

const FolderOptions = ({ row }) => {
  return (
    <Menu.Item as="div" className="py-1.5">
      {({ active }) => <RenameOption active={active} row={row} />}
    </Menu.Item>
  )
}

const RenameOption = ({ active, row }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={`${active && "bg-teal-800"} flex items-center w-full space-x-2 px-2 py-1.5 rounded`}
      >
        <PencilIcon className="h-5 w-5" />
        <span>Rename</span>
      </button>
      <RenameFolder isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}

const RenameFolder = ({ isOpen, setIsOpen }) => {
  return ReactDOM.createPortal(
    <Dialog unmount={true} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 pt-[30vh] p-4">
        <Dialog.Panel className="mx-auto max-w-xl rounded-xl bg-white shadow-2xl overflow-hidden">
          test
          <button>Rename</button>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.getElementById("__next")
  )
}

export default FolderOptions
