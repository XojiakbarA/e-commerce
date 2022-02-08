import { fetchReviews, updateProductPublished, updateReviewPublished } from "../../../../api/admin"
import { setLoading, setReviews, setSnackbar } from "../actionCreators"
import router from "next/router"


export const getReviews = (query, cookie) => {
    return async (dispatch) => {
        try {
            const res = await fetchReviews(query, cookie)
            if (res.status === 200) {
                dispatch(setReviews(res.data))
            }
        } catch (e) {
            console.log(e.response.data.message)
        }
    }
}

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

export const editReviewPublished = (id, query, setIsClicked, data) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true))
            const res = await updateReviewPublished(id, data)
            if (res.status === 200) {
                setIsClicked(false)
                dispatch(setLoading(false))
                await router.push({query}, null, {scroll: false})
                dispatch(setSnackbar({isOpen: true, text: `Review ${!data.published ? 'un' : ''}published successfully!`}))
            }
        } catch (e) {
            console.log(e)
        }
    }
}