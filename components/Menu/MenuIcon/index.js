import { Box } from '@mui/material'

import MenuIconItem from './MenuIconItem'

const MenuIcon = ({menu}) => {
    return(
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {
                menu.map((item, i) => (
                    <MenuIconItem key={i} item={item} />
                ))
            }
            
        </Box>
    )
}

export default MenuIcon