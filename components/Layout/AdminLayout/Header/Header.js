import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar } from "../styledComponents"
import NextLink from '../../../common/Link'
import AdminMenu from "./AdminMenu/AdminMenu"

const Header = ({open, handleDrawerOpen}) => {

    return (
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <NextLink href='/admin'>
                <Button size='large' color='inherit'>
                    <Typography variant='h6'>
                        Admin
                    </Typography>
                </Button>
            </NextLink>
            <Box sx={{ flexGrow: 1 }}/>
            <AdminMenu/>
            </Toolbar>
        </AppBar>
    )
}

export default Header