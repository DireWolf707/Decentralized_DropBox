import Table from "./Table"
import Sidebar from "./Sidebar"

const Content = () => {
  return (
    <div className="flex p-5 space-x-4">
      <div className="w-1/5">
        <Sidebar />
      </div>

      <div className="w-4/5">
        <div className="p-2 bg-gradient-to-br from-slate-200 to-indigo-500 rounded-xl">
          <div className="opacity-95 space-y-1 rounded-lg">
            <Table />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
