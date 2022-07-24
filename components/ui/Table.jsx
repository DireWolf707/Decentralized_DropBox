import DataTable from "react-data-table-component"
import Header from "../table/Header"
import SubHeader from "../table/SubHeader"
import NoData from "../table/NoData"
import { useMemo } from "react"
import Favourite from "../table/column/Favourite"
import { DotsVerticalIcon } from "@heroicons/react/solid"

const bytesToSize = (bytes) => {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes == 0) return "0 Byte"
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i]
}

const Table = ({ data, setFolderId, folderId, contentLoading, fetchCurrFolder }) => {
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
        minWidth: "400px",
        maxWidth: "500px",
      },
      // size
      {
        name: "Size",
        selector: (row) => <div className="">{row.size ? bytesToSize(row.size) : ""}</div>,
        sortable: true,
        width: "120px",
        center: true,
      },
      // created at
      {
        name: "Created At",
        selector: (row) => <div className="">{row._created_at.toLocaleDateString()}</div>,
        sortable: true,
        width: "120px",
      },
      // favourite
      {
        name: "Favourite",
        selector: (row) => <Favourite row={row} />,
        sortable: true,
        width: "110px",
        button: true,
      },
      // type
      {
        name: "Type",
        selector: (row) => <div className="bg-green-600 rounded-full px-2 py-0.5">{row.type ? row.type : "Folder"}</div>,
        sortable: true,
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
    <DataTable
      columns={columns}
      data={[...data.folders, ...data.files]}
      title={<Header ancestors={data.ancestors} setFolderId={setFolderId} currFolder={{ _id: data.objectId, name: data.name }} />}
      // expandableRowsComponent={Expanded}
      // expandableRowsComponentProps
      // expandableRows={true}
      noDataComponent={<NoData />}
      persistTableHead={true}
      fixedHeader={true}
      subHeader={true}
      //subHeaderWrap={true}
      subHeaderComponent={<SubHeader folderId={folderId} setFolderId={setFolderId} fetchCurrFolder={fetchCurrFolder} />}
      highlightOnHover={true}
      //pointerOnHover={true}
      theme="dark"
      keyField={"_id"}
      progressPending={contentLoading}
      //progressComponent

      // noContextMenu={false}
      // contextMessage
      // contextActions

      //selectableRows={true}
      //selectableRowsHighlight={true}
      //selectableRowsRadio={"radio"}
    />
  )
}

export default Table
