import DataTable from "react-data-table-component"
import Header from "../table/Header"
import Expanded from "../table/Expanded"
import SubHeader from "../table/SubHeader"
import NoData from "../table/NoData"

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

const Table = ({ data, setFolderId, folderId, contentLoading, fetchCurrFolder }) => {
  return (
    <>
      <DataTable
        columns={columns}
        data={[...data.folders,...data.files]}
        onRowClicked={(row) => setFolderId(row._id)}
        title={<Header ancestors={data.ancestors} setFolderId={setFolderId} currFolder={{ _id: data.objectId, name: data.name }} />}
        expandableRowsComponent={Expanded}
        //expandableRowsComponentProps
        expandableRows={true}
        noDataComponent={<NoData />}
        persistTableHead={true}
        fixedHeader={true}
        subHeader={true}
        //
        subHeaderComponent={<SubHeader folderId={folderId} setFolderId={setFolderId} fetchCurrFolder={fetchCurrFolder} />}
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
