import {FormControl, InputLabel, MenuItem,
        Select, Grid, Paper, Typography, Stack, IconButton} from "@mui/material"

import AppsIcon from '@mui/icons-material/Apps'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';

const SearchPanel = ({sort, view, handleSortChange, handleViewClick, handleSidebarClick, query, count}) => {

    return(
        <Paper sx={{py: 2, px: 4}}>
            <Grid container justifyContent='space-between' spacing={2}>
                <Grid item>
                    <Typography variant='body1'>
                        Searching for “ {query} ”
                    </Typography>
                    <Typography variant='caption'>
                        {count} results found
                    </Typography>
                </Grid>
                <Grid item>
                    <Stack direction={{xs: 'column', sm: 'row'}} alignItems={{xs: 'flex-start', sm: 'center'}} spacing={4}>
                        <FormControl sx={{minWidth: 120}}>
                            <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Sort by"
                                value={sort}
                                onChange={handleSortChange}
                                size='small'
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
                            <IconButton sx={{display: {xs: 'flex', sm: 'none'}}} onClick={handleSidebarClick}>
                                <ViewSidebarIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default SearchPanel