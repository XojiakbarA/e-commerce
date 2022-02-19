import { Paper, InputBase } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const AdminSearch = ({ onKeyUp, children, inputComponent, placeholder }) => {

    return (
        <Paper
            sx={{ padding: 1, alignItems: 'center', display: onKeyUp ? 'flex' : 'none' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                inputComponent={inputComponent}
                inputProps={{ 'aria-label': 'search google maps' }}
                onKeyUp={onKeyUp}
            />
            <SearchIcon />
            {children}
        </Paper>
    );
}

export default AdminSearch