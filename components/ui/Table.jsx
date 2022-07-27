import { useMoralis } from "react-moralis"
import { getContent } from "../../hooks/getContent"
import { useMemo, useCallback, useEffect, useState } from "react"
import { DotsVerticalIcon } from "@heroicons/react/solid"
import DataTable from "react-data-table-component"
import Header from "../table/Header"
import SubHeader from "../table/SubHeader"
import NoData from "../table/NoData"
import Favourite from "../table/column/Favourite"
import ProgressComponent from "../table/ProgressComponent"
import Loading from "../animation/Loading"

const bytesToSize = (bytes) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes == 0) return "0 Byte"
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
}

const Table = () => {
  const { user } = useMoralis()
  const [rootFolderId, _] = useState(user.attributes.rootFolderId)
  const [folderId, setFolderId] = useState(rootFolderId)

  const { fetchContent, data, loading: contentLoading } = getContent()

  const fetchCurrFolder = useCallback(() => fetchContent(folderId), [folderId])

  useEffect(() => {
    fetchCurrFolder()
  }, [folderId])

  const columns = useMemo(
    () => [
      // name
      {
        name: "Name",
        selector: (row) => {
          if (row.type)
            return (
              <a
                href={`https://${row.cid}.ipfs.dweb.link/?filename=${row.name}`}
                target="_blank"
                className="text-sm tracking-wider ml-3 hover:text-blue-400"
              >
                {row.name}
              </a>
            )
          return (
            <button onClick={() => setFolderId(row._id)} className="text-sm tracking-wider ml-3 hover:text-yellow-400">
              {row.name}
            </button>
          )
        },
        sortable: true,
        sortFunction: (a, b) => a.name.localeCompare(b.name),
        minWidth: "400px",
        maxWidth: "500px",
      },
      // size
      {
        name: "Size",
        selector: (row) => <div className="">{row.size ? bytesToSize(row.size) : ""}</div>,
        width: "120px",
        center: true,
      },
      // created at
      {
        name: "Created At",
        selector: (row) => <div className="">{row._created_at.toLocaleDateString()}</div>,
        sortFunction: (a, b) => a._created_at.getTime() > b._created_at.getTime(),
        sortable: true,
        width: "120px",
      },
      // favourite
      {
        name: "Favourite",
        selector: (row) => <Favourite row={row} />,
        width: "110px",
        button: true,
      },
      // type
      {
        name: "Type",
        selector: (row) => <div className="bg-green-600 rounded-full px-2 py-0.5">{row.type ? row.type : "Folder"}</div>,
        sortable: true,
        sortFunction: (a, b) => {
          if (a.type && b.type) return a.type.localeCompare(b.type)
          return true
        },
        width: "140px",
        wrap: true,
      },
      // options
      {
        name: "Options",
        selector: (row) => <DotsVerticalIcon className="h-5 w-4" role="button" />,
        width: "100px",
        button: true,
      },
    ],
    []
  )

  return (
    <>
      {!data && (
        <div className="flex justify-center p-24">
          <Loading />
        </div>
      )}
      {data && (
        <DataTable
          columns={columns}
          data={[...data.folders, ...data.files]}
          title={<Header ancestors={data.ancestors} setFolderId={setFolderId} currFolder={{ _id: data.objectId, name: data.name }} />}
          noDataComponent={<NoData />}
          persistTableHead={true}
          fixedHeader={true}
          subHeader={true}
          subHeaderWrap={true}
          subHeaderComponent={
            <SubHeader folderId={folderId} setFolderId={setFolderId} rootFolderId={rootFolderId} fetchCurrFolder={fetchCurrFolder} />
          }
          subHeaderAlign="left"
          highlightOnHover={true}
          theme="dark"
          keyField={"_id"}
          progressPending={contentLoading}
          progressComponent={<ProgressComponent />}

          // noContextMenu={false}
          // contextMessage
          // contextActions

          //selectableRows={true}
          //selectableRowsHighlight={true}
          //selectableRowsRadio={"radio"}
        />
      )}
    </>
  )
}

export default Table
