const Header = ({ ancestors, currFolder, setFolderId }) => {
  return (
    <div className="flex text-slate-200 text-sm font-medium">
      {ancestors.length >= 7 && <span className="mx-2 text-blue-400">... /</span>}
      {[...ancestors].slice(-6).map((folder) => (
        <div key={folder._id}>
          <button onClick={() => setFolderId(folder._id)}>
            {folder.name.length <= 15 ? folder.name : folder.name.substr(0, 15) + "..."}
          </button>
          <span className="mx-2 text-blue-400">/</span>
        </div>
      ))}
      <div key={currFolder._id}>
        <div className="underline underline-offset-2 text-yellow-400 pointer-events-none">
          {currFolder.name.length <= 15 ? currFolder.name : currFolder.name.substr(0, 15) + "..."}
        </div>
      </div>
    </div>
  )
}

export default Header
