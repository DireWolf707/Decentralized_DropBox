import { DotsVerticalIcon } from "@heroicons/react/solid"
import { Menu } from "@headlessui/react"
import CommonOptions from "./option/CommonOptions"
import FolderOptions from "./option/FolderOptions"
import FileOptions from "./option/FileOptions"

const Options = ({ row, setData }) => {
  return (
    <Menu>
      <Menu.Button>
        <DotsVerticalIcon className="h-5 w-4" role="button" />
      </Menu.Button>
      <Menu.Items
        unmount={false}
        className="absolute z-50 right-10 bg-teal-700 text-white divide-y divide-teal-500 w-44 rounded shadow-lg px-1.5"
      >
        <CommonOptions row={row} setData={setData} />
        {row.type ? <FileOptions row={row} /> : <FolderOptions row={row} />}
      </Menu.Items>
    </Menu>
  )
}

export default Options
