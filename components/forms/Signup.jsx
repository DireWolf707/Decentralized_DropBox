import { useMoralis, useMoralisCloudFunction } from "react-moralis"
import { useState } from "react"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [storageAPI, setStorageAPI] = useState("")
  const { isUserUpdating, refetchUserData } = useMoralis()
  const { fetch: createNewUser, isLoading } = useMoralisCloudFunction("createNewUser", {
    username,
    storageAPI
  }, { autoFetch: false })

  const signup = async (e) => {
    e.preventDefault()
    try {
      // verify storage api key
      await createNewUser({
        onError: (err) => console.log(err),
        onSuccess: (data) => console.log(data),
      })
      await refetchUserData()
    } catch (error) {
      // dispatch notification
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={signup} className="border rounded flex flex-col w-3/5 mx-auto mt-8 p-4 space-y-2">
        <h1 className="text-center text-xl">Sign Up</h1>
        <label>
          <span className="block">Username :</span>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded text-black px-2 py-1"
            type="text"
          />
        </label>
        <label>
          <span className="block">Storage API Key :</span>
          <input
            value={storageAPI}
            onChange={(e) => setStorageAPI(e.target.value)}
            className="w-full rounded text-black px-2 py-1"
            type="text"
          />
        </label>
        <button disabled={isLoading || isUserUpdating} className="w-full border bg-blue-500 p-1 rounded" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
