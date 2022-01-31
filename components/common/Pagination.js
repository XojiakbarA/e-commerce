import { Pagination } from "@mui/material"
import { useRouter } from "next/router"


const MyPagination = ({ meta }) => {

    const router = useRouter()

    const handlePageChange = (e, p) => {
        router.push({
            query: { ...router.query, page: p }
        })
    }

    return (
        <Pagination
            color='primary'
            sx={{my: 2}}
            page={meta.current_page}
            count={meta.last_page}
            onChange={ handlePageChange }
        />
    )
}

export default MyPagination