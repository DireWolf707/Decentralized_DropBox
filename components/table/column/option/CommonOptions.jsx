import { useState } from "react"
import { markAsHidden } from "../../../../hooks/markAsHidden"
import { useMoralis } from "react-moralis"
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid"

const CommonOptions = ({ row, setData }) => {
  return (
    <div className="py-1.5">
      <HideOption row={row} setData={setData} />
    </div>
  )
}

const HideOption = ({ row, setData }) => {
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
    <button onClick={toggleHidden} className="hover:bg-teal-800 flex items-center w-full space-x-2 px-2 py-1.5 rounded">
      {hidden ? <EyeIcon className="h-5 w-5" /> : <EyeOffIcon className="h-5 w-5" />}
      <span>{hidden ? "Un-hide" : "Hide"}</span>
    </button>
  )
}

export default CommonOptions
