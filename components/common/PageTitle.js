import { Stack, Typography } from "@mui/material"


const PageTitle = ({ title, titleIcon }) => {

    return (
        <Stack direction='row' spacing={1} alignItems='center'>
            {titleIcon}
            <Typography variant='h4'>{title}</Typography>
        </Stack>
    )
}

export default PageTitle