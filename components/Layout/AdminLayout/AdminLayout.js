import { Box, CssBaseline } from "@mui/material"
import { useState } from "react"
import Header from "./Header/Header"
import Sidebar from "./Sidebar"
import { DrawerHeader } from "./styledComponents"


const AdminLayout = ({ children }) => {

    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header
                open={open}
                handleDrawerOpen={handleDrawerOpen}
            />
            <Sidebar
                open={open}
                handleDrawerClose={handleDrawerClose}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    )
}

export default AdminLayout