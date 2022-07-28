import ReactDOM from "react-dom"
import { Dialog, Combobox } from "@headlessui/react"
import { SearchIcon } from "@heroicons/react/solid"
import { useState, useEffect } from "react"
import { findFiles } from "../../../hooks/findFiles"

const Findfile = ({ isOpen, setIsOpen, setFolderId }) => {
  const [query, setQuery] = useState("")
  // not using data directly from findFiles hook (for reseting purpose)
  const [data, setData] = useState(null)
  const { find } = findFiles()

  useEffect(() => {
    if (query != "") {
      const timer = setTimeout(async () => {
        setData(await find(query))
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [query])

  const resetStates = () => {
    setIsOpen(false)
    setQuery("")
    setData(null)
  }

  return ReactDOM.createPortal(
    <Dialog unmount={true} open={isOpen} onClose={() => resetStates()} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 pt-[30vh] p-4">
        <Dialog.Panel className="mx-auto max-w-xl rounded-xl bg-white shadow-2xl overflow-hidden">
          <Combobox onChange={() => {}} as="div" className="divide-y-2 divide-gray-200">
            <div className="flex items-center px-4 space-x-2">
              <SearchIcon className="h-6 w-6" />

              <Combobox.Input
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 h-12"
                placeholder="Search..."
              />
            </div>

            {data && data.length > 0 && (
              <Combobox.Options static={true} className="text-sm max-h-96 overflow-y-auto py-1">
                {data.map((file) => (
                  <Combobox.Option key={file.objectId} value={file}>
                    {({ active }) => (
                      <div className={`space-x-1.5 px-4 py-2 ${active ? "bg-indigo-600" : "bg-white"}`}>
                        <span className={`font-medium ${active ? "text-white" : "text-gray-900"}`}>
                          <a
                            href={`https://${file.cid}.ipfs.dweb.link/?filename=${file.name}`}
                            target="_blank"
                            className="hover:text-slate-100"
                          >
                            {file.name}
                          </a>
                        </span>
                        <span className={`${active ? "text-indigo-200" : "text-gray-400"}`}>in</span>
                        <span className={`font-bold ${active ? "text-indigo-200" : "text-gray-400"}`}>
                          <button
                            onClick={() => {
                              setFolderId(file.parent._id)
                              resetStates()
                            }}
                          >
                            {file.parent.name}
                          </button>
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query && data && data.length === 0 && <p className="text-sm p-4 text-gray-500">No results found.</p>}
          </Combobox>
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.getElementById("__next")
  )
}

export default Findfile
