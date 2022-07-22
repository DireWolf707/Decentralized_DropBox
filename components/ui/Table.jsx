import DataTable from "react-data-table-component"

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

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

const Table = ({ data, setFolderId }) => {
  return (
    <>
      {data && (
        <DataTable
          columns={columns}
          data={data.folders}
          title={"My Files"}

          expandableRowsComponent={ExpandedComponent}
          //expandableRowsComponentProps
          onRowClicked={row => setFolderId(row._id)}
          expandableRows={true}
          //noDataComponent

          persistTableHead={true}
          fixedHeader={true}
          subHeader={true}
          // subHeaderComponent

          highlightOnHover={true}
          pointerOnHover={true}
          theme="dark"
          keyField={"_id"}
          
          //progressPending
          //progressComponent

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
