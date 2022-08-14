import { useNotification } from "web3uikit"
import { ClipboardIcon } from "@heroicons/react/solid"

const FileOptions = ({ row }) => {
  return (
    <div className="py-1.5">
      <CopyLinkOption row={row} />
    </div>
  )
}

const CopyLinkOption = ({ row }) => {
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
    <button onClick={copyLink} className="hover:bg-teal-800 flex items-center w-full space-x-2 px-2 py-1.5 rounded">
      <ClipboardIcon className="h-5 w-5" />
      <span>Copy Link</span>
    </button>
  )
}

export default FileOptions
