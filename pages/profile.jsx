import { useState } from "react"
import Border from "../components/animation/Border"
import { useMoralis } from "react-moralis"
import { validateToken } from "../utils/validateWeb3StorageToken"
import { useNotification } from "web3uikit"

const Profile = () => {
  const dispatch = useNotification()
  const { user, setUserData, isUserUpdating } = useMoralis()
  const [username, setUsername] = useState(user.attributes.username)
  const [storageAPI, setStorageAPI] = useState(user.attributes.storageAPI)
  const [hidden, setHidden] = useState(user.attributes.hidden)

  const updateProfile = async () => {
    // validate username
    if (username.length < 5)
      return dispatch({
        type: "warning",
        message: "Username should of 5 characters or more",
        title: "Warning !",
        position: "topR",
      })
    // validate Storage API Key
    if (!(await validateToken(storageAPI)))
      return dispatch({
        type: "warning",
        message: "Something wrong with Storage API Key",
        title: "Warning !",
        position: "topR",
      })

    const _user = await setUserData({
      username,
      storageAPI,
      hidden,
    })

    if (_user)
      dispatch({
        type: "success",
        message: "Profile Updated",
        title: "Success !",
        position: "topR",
      })
    else
      dispatch({
        type: "error",
        message: "Please reload this page",
        title: "Something went wrong!",
        position: "topR",
      })
  }

  return (
    <div className="w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto my-32">
      <Border padding={"p-10"}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            updateProfile()
          }}
          className="flex flex-col space-y-2"
        >
          <h1 className="text-center text-xl font-bold">Profile</h1>

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

          <label className="flex items-center space-x-2 p-1.5">
            <span>Show hidden files/folder </span>
            <input checked={hidden} onChange={() => setHidden((pv) => !pv)} className="h-4 w-4" type="checkbox" />
          </label>

          <button
            disabled={isUserUpdating}
            className="w-full bg-blue-500 hover:bg-blue-800 disabled:bg-blue-900 hover:text-slate-300 p-1 rounded"
            type="submit"
          >
            Update
          </button>
        </form>
      </Border>
    </div>
  )
}
Profile.auth = true
export default Profile
