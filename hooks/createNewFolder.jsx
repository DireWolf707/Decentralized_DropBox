import { useMoralisCloudFunction } from "react-moralis"
import { useNotification } from "web3uikit"

export const createNewFolder = () => {
  const dispatch = useNotification()
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("createNewFolder", {}, { autoFetch: false })

  const addFolder = async (name, parentId) => {
    // validate folder name
    if (name.length == 0)
      return dispatch({
        type: "warning",
        message: "Folder name must be atleast 1 character",
        title: "Warning !",
        position: "topR",
      })
    // call cloud function to create folder
    await fetch({
      onSuccess: () =>
        dispatch({
          type: "success",
          message: "New folder created successfully",
          title: "Success !",
          position: "topR",
        }),
      onError: (err) =>
        dispatch({
          type: "error",
          message: "Something went wrong",
          title: "Error !",
          position: "topR",
        }),
      params: { name, parentId },
    })
  }

  return { addFolder, loading: isLoading || isFetching }
}
