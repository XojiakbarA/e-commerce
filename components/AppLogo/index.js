import { Typography } from "@mui/material"

const AppLogo = () => {
    return(
        <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
        >
            e-commerce
        </Typography>
    )
}

export default AppLogo