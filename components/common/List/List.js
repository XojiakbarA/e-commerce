import { Grid, Pagination } from "@mui/material"
import MyPagination from "../Pagination"
import ListHead from "./ListHead"


const List = ({labels, children, meta}) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ListHead labels={labels}/>
            </Grid>
            {
                children
            }
            {
                meta.last_page > 1 &&
                <Grid item xs={12}>
                    <MyPagination meta={meta}/>
                </Grid>
            }
        </Grid>
    )
}

export default List