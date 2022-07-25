import { useMoralisQuery, useMoralis } from "react-moralis"

const Sidebar = () => {
  const { user } = useMoralis()

  const {
    data: favFiles,
    isFetching,
    isLoading,
  } = useMoralisQuery("File", (q) => q.equalTo("user", user.id).equalTo("favourite", true), [], { live: true })

  return (
    <div className="bg-slate-800 p-3 rounded-lg text-blue-300">
      <div className="divide-y-2">
        <h2 className="text-lg font-medium text-green-400">Favourite Files</h2>
        {isFetching || isLoading ? (
          <div className="text-center p-3">Loading...</div>
        ) : favFiles.length == 0 ? (
          <div className="text-center p-3">Files marked as favourite will be shown here!</div>
        ) : (
          <ul className="marker:text-sky-400 list-disc space-y-2 p-3">
            {favFiles.map((f) => (
              <li key={f.id}>
                <a
                  href={`https://${f.attributes.cid}.ipfs.dweb.link/?filename=${f.attributes.name}`}
                  target="_blank"
                  className="text-sm tracking-wide hover:text-blue-400"
                >
                  {f.attributes.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Sidebar
