import { DotsVerticalIcon, EyeIcon, EyeOffIcon, ClipboardIcon, PencilIcon } from "@heroicons/react/solid"
import { Menu } from "@headlessui/react"
import { useState } from "react"
import { markAsHidden } from "../../../hooks/markAsHidden"
import { useMoralis } from "react-moralis"
import { useNotification } from "web3uikit"

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

const FolderOptions = ({ row }) => {
  return (
    <Menu.Item as="div" className="py-1.5">
      {({ active }) => <RenameOption active={active} row={row} />}
    </Menu.Item>
  )
}

const RenameOption = ({ active, row }) => {
  const renameFolder = () => {
    console.log("rename")
  }

  return (
    <button onClick={renameFolder} className={`${active && "bg-teal-800"} flex items-center w-full space-x-2 px-2 py-1.5 rounded`}>
      <PencilIcon className="h-5 w-5" />
      <span>Rename</span>
    </button>
  )
}

const FileOptions = ({ row }) => {
  return (
    <Menu.Item as="div" className="py-1.5">
      {({ active }) => <CopyLinkOption active={active} row={row} />}
    </Menu.Item>
  )
}

const CopyLinkOption = ({ active, row }) => {
  const dispatch = useNotification()

  const copyLink = async () => {
    await navigator.clipboard.writeText(`https://${row.cid}.ipfs.dweb.link/?filename=${row.name}`)
    dispatch({
      type: "success",
      message: "Link Copied to Clipboard",
      title: "Copy Link",
      position: "topR",
    })
  }

  return (
    <button onClick={copyLink} className={`${active && "bg-teal-800"} flex items-center w-full space-x-2 px-2 py-1.5 rounded`}>
      <ClipboardIcon className="h-5 w-5" />
      <span>Copy Link</span>
    </button>
  )
}

const CommonOptions = ({ row, setData }) => {
  return (
    <Menu.Item as="div" className="py-1.5">
      {({ active }) => <HideOption active={active} row={row} setData={setData} />}
    </Menu.Item>
  )
}

const HideOption = ({ active, row, setData }) => {
  const { user } = useMoralis()
  const { changeHidden } = markAsHidden()
  const [hidden, setHidden] = useState(row.hidden)

  const toggleHidden = async () => {
    const newHidden = await changeHidden(row._id, row.type)
    // dont show hidden files/folder and new hidden is true
    if (!user.attributes.hidden && newHidden)
      setData((pv) => {
        return { ...pv, tableData: pv.tableData.filter((i) => i._id != row._id) }
      })
    else setHidden(newHidden)
  }

  return (
    <button onClick={toggleHidden} className={`${active && "bg-teal-800"} flex items-center w-full space-x-2 px-2 py-1.5 rounded`}>
      {hidden ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
      <span>{hidden ? "Un-hide" : "Hide"}</span>
    </button>
  )
}

export default Options
