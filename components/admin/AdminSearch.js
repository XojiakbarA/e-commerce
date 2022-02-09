import { Paper, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const AdminSearch = ({ onKeyUp, children }) => {

    return (
        <Paper
            sx={{ padding: 1, alignItems: 'center', display: 'flex' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search google maps' }}
                onKeyUp={onKeyUp}
            />
            <SearchIcon />
            {children}
        </Paper>
    );
}

export default AdminSearch