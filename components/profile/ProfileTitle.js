import { Stack, Typography, Button } from "@mui/material"

const ProfileTitle = ({title, titleIcon, buttonText, buttonIcon}) => {
    return (
        <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row'>
                {titleIcon}
                <Typography variant='h4'>{title}</Typography>
            </Stack>
            <Button variant='contained' startIcon={buttonIcon}>
                {buttonText}
            </Button>
        </Stack>
    )
}

export default ProfileTitle