import Table from "./Table"
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

      <div className="flex p-5 space-x-4">
        <div className="w-1/5 min-h-[80vh] bg-slate-600"></div>
        <div className="w-4/5">
          <div className="p-2 bg-gradient-to-br from-slate-200 to-indigo-500 rounded-xl">
            <div className="opacity-95 space-y-1 rounded-lg">
            {contentLoading && <div>loading....</div>}
            <Table data={data} setFolderId={setFolderId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
