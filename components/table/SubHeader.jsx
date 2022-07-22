import { createNewFolder } from "../../hooks/createNewFolder"
import { useState } from "react"
import { FolderAddIcon, RefreshIcon, HomeIcon, DocumentAddIcon } from "@heroicons/react/solid"

const SubHeader = () => {
  const [newFolderName, setNewFolderName] = useState("")
  const { addFolder, loading: folderLoading } = createNewFolder()
  return (
    <div className="flex justify-between w-full">
      <div className="flex space-x-2">
        <HomeIcon className="h-6 w-6" />
        <RefreshIcon className="h-6 w-6" />
        <DocumentAddIcon className="h-6 w-6" />
        <form>
          {/* <input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} type="text" className="text-black" /> */}
          <FolderAddIcon
            disabled={folderLoading}
            onClick={async (e) => {
              e.preventDefault()
              await addFolder(newFolderName, folderId)
              await fetchContent(folderId)
            }}
            className="h-6 w-6"
            role="button"
          />
        </form>
      </div>
      <div>Search</div>
    </div>
  )
}

export default SubHeader
