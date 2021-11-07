import {FormControl, InputLabel, MenuItem,
        Select, Grid, Paper, Typography, Stack, IconButton} from "@mui/material"

import AppsIcon from '@mui/icons-material/Apps'
import ViewListIcon from '@mui/icons-material/ViewList'

const SearchPanel = ({sort, view, handleSortChange, handleViewClick}) => {

    return(
        <Paper sx={{py: 2, px: 4}}>
            <Grid container justifyContent='space-between'>
                <Grid item>
                    <Typography variant='body1'>
                        Searching for “ mobile phone ”
                    </Typography>
                    <Typography variant='caption'>
                        30 results found
                    </Typography>
                </Grid>
                <Grid item>
                    <Stack direction='row' alignItems='center' spacing={4}>
                        <FormControl sx={{minWidth: 120}}>
                            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Sort by"
                                value={sort}
                                onChange={handleSortChange}
                            >
                                <MenuItem value='new'>New</MenuItem>
                                <MenuItem value='expensive'>Expensive</MenuItem>
                                <MenuItem value='cheap'>Cheap</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Typography variant='body2'>
                                View:
                            </Typography>
                            <IconButton color={view == 'grid' ? 'primary' : 'default'} onClick={(e) => handleViewClick(e, 'grid')}>
                                <AppsIcon />
                            </IconButton>
                            <IconButton color={view == 'list' ? 'primary' : 'default'} onClick={(e) => handleViewClick(e, 'list')}>
                                <ViewListIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SearchPanel