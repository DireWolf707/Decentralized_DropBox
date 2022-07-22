import { createNewFolder } from "../../hooks/createNewFolder"
import { useState } from "react"

const SubHeader = () => {
  const [newFolderName, setNewFolderName] = useState("")
  const { addFolder, loading: folderLoading } = createNewFolder()
  return (
    <div className="flex justify-between w-full">
      <div>
        <form>
          <input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} type="text" className="text-black" />
          <button
            disabled={folderLoading}
            onClick={async (e) => {
              e.preventDefault()
              await addFolder(newFolderName, folderId)
              await fetchContent(folderId)
            }}
            className="border rounded"
          >
            Add folder +
          </button>
        </form>
      </div>
      <div>Search</div>
    </div>
  )
}

export default SubHeader
