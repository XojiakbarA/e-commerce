import { useState } from "react"
import { useRouter } from "next/router"
import {FormControl, InputLabel, MenuItem,
        Select, Grid, Paper, Typography, Stack, IconButton} from "@mui/material"

import AppsIcon from '@mui/icons-material/Apps'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar'

const SearchPanel = ({listView, handleViewClick, handleSidebarClick, title, total}) => {

    const router = useRouter()
    const initSort = router.query.sort_by || 'created_at,desc'
    const [sort, setSort] = useState(initSort)

    function handleSortChange(e) {
        const sort = e.target.value
        setSort(sort)

        router.push({
            query: { ...router.query, sort_by: sort.split(','), page: 1 }
        })
    }

    return(
        <Paper sx={{py: 2, px: 4}}>
            <Grid container justifyContent='space-between' spacing={2}>
                <Grid item>
                    <Typography variant='body1'>
                        Searching for “ {title} ”
                    </Typography>
                    <Typography variant='caption'>
                        {total} results found
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
                                onChange={ (e) => handleSortChange(e) }
                                size='small'
                            >
                                <MenuItem value='created_at,desc'>New</MenuItem>
                                <MenuItem value='price,desc'>Expensive</MenuItem>
                                <MenuItem value='price,asc'>Cheap</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack direction='row' alignItems='center' spacing={2}>
                            <Typography variant='body2'>
                                View:
                            </Typography>
                            <IconButton color={!listView ? 'primary' : 'default'} onClick={(e) => handleViewClick(false)}>
                                <AppsIcon />
                            </IconButton>
                            <IconButton color={listView ? 'primary' : 'default'} onClick={(e) => handleViewClick(true)}>
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