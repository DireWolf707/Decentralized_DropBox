import { useMoralis, useMoralisCloudFunction } from "react-moralis"
import { useState } from "react"
import Border from "../animation/Border"

const Signup = () => {
  const [username, setUsername] = useState("")
  const [storageAPI, setStorageAPI] = useState("")
  const { isUserUpdating, refetchUserData } = useMoralis()
  const { fetch: createNewUser, isLoading } = useMoralisCloudFunction(
    "createNewUser",
    {
      username,
      storageAPI,
    },
    { autoFetch: false }
  )

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
    <div className="w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-32">
      <Border padding={"10"}>
        <form onSubmit={signup} className="flex flex-col space-y-2">
          <h1 className="text-center text-xl font-bold">Sign Up</h1>
          <label>
            <span className="block mb-1">Username :</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded text-blue-600 px-2 py-1"
              type="text"
            />
          </label>
          <label>
            <span className="block mb-1">Storage API Key :</span>
            <input
              value={storageAPI}
              onChange={(e) => setStorageAPI(e.target.value)}
              className="w-full rounded text-blue-600 px-2 py-1"
              type="text"
            />
          </label>
          <button disabled={isLoading || isUserUpdating} className="w-full bg-blue-500 hover:bg-blue-800 hover:text-slate-300 p-1 rounded" type="submit">
            Submit
          </button>
        </form>
      </Border>
    </div>
  )
}

export default Signup
