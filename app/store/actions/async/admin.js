import { updateProductPublished } from "../../../../api/admin"
import { setLoading, setSnackbar } from "../actionCreators"
import { getProducts } from "./common"


export const editProductPublished = (id, query, setPublished, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateProductPublished(id, data)
            if (res.status === 200) {
                setPublished(data.published)
                dispatch(setLoading(false))
                dispatch(setSnackbar({isOpen: true, text: `Product ${!data.published ? 'un' : ''}published successfully!`}))
                dispatch(getProducts(query))
            }
        } catch (e) {
            console.log(e)
        }
    }
}