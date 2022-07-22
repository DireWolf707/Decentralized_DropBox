import DataTable from "react-data-table-component"

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

const HeaderComponent = ({ ancestors, currFolder, setFolderId }) => {
  return (
    <div className="flex text-slate-200 text-sm font-medium">
      {ancestors.length >= 7 && <span className="mx-2 text-blue-400">... /</span>}
      {[...ancestors].slice(-6).map((folder) => (
        <div key={folder._id}>
          <button onClick={() => setFolderId(folder._id)}>
            {folder.name.length <= 15 ? folder.name : folder.name.substr(0, 15) + "..."}
          </button>
          <span className="mx-2 text-blue-400">/</span>
        </div>
      ))}
      <div key={currFolder._id}>
        <div className="underline underline-offset-2 text-yellow-400 pointer-events-none">
          {currFolder.name.length <= 15 ? currFolder.name : currFolder.name.substr(0, 15) + "..."}
        </div>
      </div>
    </div>
  )
}

const NoDataComponent = () => {
  return <p className="py-8">Folder is Empty!</p>
}

const SubHeaderComponent = () => {
  return (
    <div className="flex justify-between w-full">
      <div>icons</div>
      <div>Search</div>
    </div>
  )
}

const columns = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
    minWidth: "400px",
    maxWidth: "500px",
  },
  {
    name: "Size",
    selector: (row) => (row.size ? row.size : "-"),
    sortable: true,
    maxWidth: "110px",
  },
  {
    name: "Created At",
    selector: (row) => row._created_at.toLocaleDateString(),
    sortable: true,
    maxWidth: "140px",
  },
  {
    name: "Favourite",
    selector: (row) => (row.fav ? row.fav : "-"),
    sortable: true,
    maxWidth: "110px",
  },
  {
    name: "Type",
    selector: (row) => (row.type ? row.type : "Folder"),
    sortable: true,
    maxWidth: "110px",
  },
]

const Table = ({ data, setFolderId, contentLoading }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={data.folders}
        onRowClicked={(row) => setFolderId(row._id)}
        title={
          <HeaderComponent ancestors={data.ancestors} setFolderId={setFolderId} currFolder={{ _id: data.objectId, name: data.name }} />
        }
        expandableRowsComponent={ExpandedComponent}
        //expandableRowsComponentProps
        expandableRows={true}
        noDataComponent={<NoDataComponent />}
        persistTableHead={true}
        fixedHeader={true}
        subHeader={true}
        subHeaderComponent={<SubHeaderComponent />}
        highlightOnHover={true}
        pointerOnHover={true}
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
    </>
  )
}

export default Table
