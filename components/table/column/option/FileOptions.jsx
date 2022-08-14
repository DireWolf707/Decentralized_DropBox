import { useState } from "react"
import { useNotification } from "web3uikit"
import { ClipboardIcon, PlayIcon } from "@heroicons/react/solid"
import ReactDOM from "react-dom"
import { Dialog } from "@headlessui/react"
import Plyr from "plyr-react"
import "plyr-react/plyr.css"

const FileOptions = ({ row, setOptionMenuId }) => {
  return (
    <>
      <div className="py-1.5">
        <CopyLinkOption row={row} setOptionMenuId={setOptionMenuId} />
      </div>
      {/* option only for audio/video */}
      {(row.type.startsWith("video") || row.type.startsWith("audio")) && (
        <div className="py-1.5">
          <PlayOption row={row} setOptionMenuId={setOptionMenuId} />
        </div>
      )}
    </>
  )
}

const PlayOption = ({ row, setOptionMenuId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true) // open player modal
          setOptionMenuId(null) // close options
        }}
        className="hover:bg-teal-800 flex items-center w-full space-x-2 px-2 py-1.5 rounded"
      >
        <PlayIcon className="h-5 w-5" />
        <span>Play</span>
      </button>
      {isModalOpen && <Player isOpen={isModalOpen} setIsOpen={setIsModalOpen} row={row} />}
    </>
  )
}

const Player = ({ isOpen, setIsOpen, row }) => {
  const [type, setType] = useState(row.type.startsWith("video") ? "video" : "audio")
  const [playerHeight, setPlayerHeight] = useState(row.type.startsWith("video") ? "pt-[18vh]" : "pt-[40vh]")

  return ReactDOM.createPortal(
    <Dialog static={true} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
      {/* Full-screen container to center the panel */}
      <div className={`fixed inset-0 ${playerHeight} p-4`}>
        <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white shadow-2xl">
          <Plyr
            source={{
              type,
              sources: [
                {
                  src: `https://ipfs.io/ipfs/${row.cid}`,
                  type: row.type,
                },
              ],
            }}
            options={{
              autoplay: true,
            }}
            autoPlay={true}
          />
        </Dialog.Panel>
      </div>
    </Dialog>,
    document.getElementById("__next")
  )
}

const CopyLinkOption = ({ row, setOptionMenuId }) => {
  const dispatch = useNotification()

  const copyLink = async () => {
    await navigator.clipboard.writeText(`https://${row.cid}.ipfs.dweb.link/?filename=${row.name}`)
    // dispatch notification
    dispatch({
      type: "success",
      message: "Link Copied to Clipboard",
      title: "Copy Link",
      position: "topR",
    })
    setOptionMenuId(null) // close options
  }

  return (
    <button onClick={copyLink} className="hover:bg-teal-800 flex items-center w-full space-x-2 px-2 py-1.5 rounded">
      <ClipboardIcon className="h-5 w-5" />
      <span>Copy Link</span>
    </button>
  )
}

export default FileOptions
