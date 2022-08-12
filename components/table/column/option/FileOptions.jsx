import { useNotification } from "web3uikit"
import { ClipboardIcon } from "@heroicons/react/solid"
import { Menu } from "@headlessui/react"

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

export default FileOptions
