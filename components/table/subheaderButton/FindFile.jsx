import ReactDOM from "react-dom"
import { Dialog, Combobox } from "@headlessui/react"
import { SearchIcon } from "@heroicons/react/solid"
import { useState } from "react"

const Findfile = ({ isOpen, setIsOpen }) => {
  const [files, setFiles] = useState([1, 2, 3])
  const [query, setQuery] = useState("")

  return ReactDOM.createPortal(
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 pt-[30vh] p-4">
        <Dialog.Panel className="mx-auto max-w-xl rounded-xl bg-white shadow-2xl overflow-hidden">
          <Combobox
            onChange={(file) => {
              setQuery("")
              // when file is clicked
            }}
            as="div"
            className="divide-y-2 divide-gray-200"
          >
            <div className="flex items-center px-4 space-x-2">
              <SearchIcon className="h-6 w-6" />
              <Combobox.Input
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 h-12"
                placeholder="Search..."
              />
            </div>

            {files.length > 0 && (
              <Combobox.Options className="text-sm max-h-96 overflow-y-auto py-1">
                {files.map((file) => (
                  <Combobox.Option key={file}>
                    {({ active }) => (
                      <div className={`space-x-1 px-4 py-2 ${active ? "bg-indigo-600" : "bg-white"}`}>
                        <span className={`font-medium ${active ? "text-white" : "text-gray-900"}`}>file {file} </span>
                        <span className={`font-medium ${active ? "text-indigo-200" : "text-gray-400"}`}>in folder {file} </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query && files.length === 0 && <p className="text-sm p-4 text-gray-500">No results found.</p>}
          </Combobox>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.getElementById("__next")
  )
}

export default Findfile
