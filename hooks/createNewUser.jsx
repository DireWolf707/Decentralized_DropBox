import { useNotification } from "web3uikit"
import { useMoralis, useMoralisCloudFunction } from "react-moralis"
import { Web3Storage } from "web3.storage"

const validateToken = async (token) => {
  const web3storage = new Web3Storage({ token })

  try {
    for await (const _ of web3storage.list({ maxResults: 1 })) {
      // any non-error response means the token is legit
      break
    }
    return true
  } catch (e) {
    // only return false for auth-related errors
    // if (e.message.includes("401") || e.message.includes("403")) {
    //   return false
    // }
    // propagate non-auth errors
    // throw e
    return false
  }
}

export const createNewUser = () => {
  const { isUserUpdating, refetchUserData } = useMoralis()
  const dispatch = useNotification()

  const { fetch: createNewUser, isLoading, isFetching } = useMoralisCloudFunction("createNewUser", {}, { autoFetch: false })

  const signup = async (username, storageAPI) => {
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

    try {
      // call cloud function to create user
      await createNewUser({
        onError: (err) =>
          dispatch({
            type: "error",
            message: err.message,
            title: "Error !",
            position: "topR",
          }),
        onSuccess: () =>
          dispatch({
            type: "success",
            message: "Signup Successful",
            title: "Success !",
            position: "topR",
          }),
        params: {
          username,
          storageAPI,
        },
      })
      // refresh user data to get Storage API Key
      await refetchUserData()
    } catch (err) {
      dispatch({
        type: "error",
        message: "Please reload this page",
        title: "Something went wrong!",
        position: "topR",
      })
    }
  }

  return { signup, loading: isLoading || isFetching || isUserUpdating }
}
