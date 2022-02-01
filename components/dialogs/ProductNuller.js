import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setProduct } from "../../app/store/actions/actionCreators"


const ProductNuller = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(setProduct({}))
        }
    }, [dispatch])

    return null
}

export default ProductNuller