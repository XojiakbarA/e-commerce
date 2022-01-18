import { Grid, Pagination } from "@mui/material"
import ListHead from "./ListHead"


const List = ({labels, children, meta, onChange}) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <ListHead labels={labels}/>
            </Grid>
            {
                children
            }
            {
                meta && meta.last_page > 1 &&
                <Grid item xs={12}>
                    <Pagination
                        color="primary"
                        page={meta.current_page}
                        count={meta.last_page}
                        onChange={onChange}
                    />
                </Grid>
            }
        </Grid>
    )
}

export default List