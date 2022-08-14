import { DotsVerticalIcon } from "@heroicons/react/solid"
import CommonOptions from "./option/CommonOptions"
import FolderOptions from "./option/FolderOptions"
import FileOptions from "./option/FileOptions"

const Options = ({ row, setData, optionMenuId, setOptionMenuId }) => {
  return (
    <div>
      <DotsVerticalIcon
        onClick={() => {
          setOptionMenuId((pv) => (pv ? (pv == row._id ? null : row._id) : row._id))
        }}
        className="h-5 w-4"
        role="button"
      />
      <div
        className={`${
          row._id != optionMenuId && "hidden"
        } absolute z-50 right-10 bg-teal-700 text-white divide-y divide-teal-500 w-44 rounded shadow-lg px-1.5 border border-teal-800`}
      >
        <CommonOptions row={row} setData={setData} />
        {row.type ? <FileOptions row={row} setOptionMenuId={setOptionMenuId} /> : <FolderOptions row={row} setOptionMenuId={setOptionMenuId} setData={setData} />}
      </div>
    </div>
  )
}

export default Options
