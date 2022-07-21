import { useEffect, useState } from "react"
import { createNewFolder } from "../../hooks/createNewFolder"
import { getContent } from "../../hooks/getContent"

const Content = ({ folderId, setFolderId }) => {
  const [newFolderName, setNewFolderName] = useState("")
  const { fetchContent, data, loading: contentLoading } = getContent()
  const { addFolder, loading: folderLoading } = createNewFolder()

  useEffect(() => {
    fetchContent(folderId)
  }, [folderId])

  return (
    <div>
      <div className="flex divide-x-2 space-x-2">
        {data &&
          data.ancestors.map((ancestor) => (
            <div key={ancestor._id}>
              <button onClick={() => setFolderId(ancestor._id)}> {ancestor.name}</button>
            </div>
          ))}
      </div>
      <form>
        <input value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} type="text" className="text-black" />
        <button
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
      <div className="flex flex-col">
        {contentLoading && <div>loading....</div>}
        {data &&
          data.folders.map((folder) => (
            <div key={folder._id}>
              <button disabled={folderLoading} onClick={() => setFolderId(folder._id)}>
                {folder.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Content
