import { Avatar, Chip, Grid, IconButton, Paper, Rating, Tooltip, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'

const ProductListItem = ({  }) => {

    return (
        <Paper sx={{padding: 2}}>
            <Grid container alignItems='center'>
                <Grid item xs={3} display='flex' justifyContent='center'>
                    <Typography
                        variant='body2'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        overflow='hidden'
                    >
                        ProductTitleProductTitleProductTitle
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Avatar variant="rounded"/>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Chip label={1} size='small'/>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Typography variant='body2'>
                        $ 300
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Typography variant='body2'>
                        $ 210
                    </Typography>
                </Grid>
                <Grid item xs display='flex' justifyContent='center'>
                    <Rating value={1} readOnly size="small"/>
                </Grid>
                <Grid item xs display='flex'>
                    <Tooltip title='Edit'>
                        <IconButton>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Delete'>
                        <IconButton>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='View'>
                        <IconButton>
                            <VisibilityIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProductListItem