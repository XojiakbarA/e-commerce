import { Button, Typography } from "@mui/material"
import Link from "next/link"

const AppLogo = () => {
    return(
        <Link href='/'>
        <a>
            <Button size='large' sx={{color: 'inherit'}}>
                <Typography variant='h6'>
                    e-commerce
                </Typography>
            </Button>
        </a>
        </Link>
    )
}

export default AppLogo