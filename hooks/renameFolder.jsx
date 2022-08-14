import { useMoralisCloudFunction } from "react-moralis"
import { useNotification } from "web3uikit"

export const renameFolder = () => {
  const dispatch = useNotification()
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("renameFolder", {}, { autoFetch: false })

  const renameHandler = async (folderId, newFolderName, modalFxn) => {
    // validate folder name
    if (newFolderName.length == 0)
      return dispatch({
        type: "warning",
        message: "Folder name must be atleast 1 character",
        title: "Warning !",
        position: "topR",
      })
    // call cloud function to create folder
    return await fetch({
      onSuccess: async () => {
        dispatch({
          type: "success",
          message: "Folder renamed successfully",
          title: "Success !",
          position: "topR",
        })
        modalFxn(false) // close modal
      },
      onError: (err) =>
        dispatch({
          type: "error",
          message: "Something went wrong",
          title: "Error !",
          position: "topR",
        }),
      params: { folderId, newFolderName },
    })
  }
  return { renameHandler, loading: isLoading || isFetching }
}
