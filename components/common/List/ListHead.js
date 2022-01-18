import { Box, Grid, Typography } from "@mui/material"


const ListHead = ({labels}) => {

    return (
        <Box sx={{padding: 2}}>
            <Grid container>
                {
                    labels.map((label, i) => (
                        <Grid
                            item
                            key={label}
                            xs={ i == 0 ? 3 : true }
                            sx={i == 0 ? {display: 'block'} : {display: 'flex', justifyContent: 'center'}}
                        >
                            <Typography variant='button'>
                                {label}
                            </Typography>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
}

export default ListHead