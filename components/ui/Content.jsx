import Table from "./Table"
import { useCallback, useEffect } from "react"

import { getContent } from "../../hooks/getContent"

const Content = ({ folderId, setFolderId }) => {
  const { fetchContent, data, loading: contentLoading } = getContent()

  const fetchCurrFolder = useCallback(() => {
    fetchContent(folderId)
  }, [folderId])

  useEffect(() => {
    fetchCurrFolder()
  }, [folderId])

  return (
    <div className="flex p-5 space-x-4">
      <div className="w-1/5 min-h-[80vh] bg-slate-600"></div>

      <div className="w-4/5">
        <div className="p-2 bg-gradient-to-br from-slate-200 to-indigo-500 rounded-xl">
          <div className="opacity-95 space-y-1 rounded-lg">
            {!data && <div className="text-3xl">Loading...</div>}
            {data && (
              <Table
                data={data}
                setFolderId={setFolderId}
                contentLoading={contentLoading}
                fetchCurrFolder={fetchCurrFolder}
                folderId={folderId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
