import { updateProductPublished } from "../../../../api/admin"
import { setLoading, setSnackbar } from "../actionCreators"
import router from "next/router"


export const editProductPublished = (id, query, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateProductPublished(id, data)
            if (res.status === 200) {
                setIsClicked(false)
                dispatch(setLoading(false))
                await router.push({query})
                dispatch(setSnackbar({isOpen: true, text: `Product ${!data.published ? 'un' : ''}published successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}