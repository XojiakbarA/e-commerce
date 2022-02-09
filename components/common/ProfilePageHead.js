import { Button, Stack } from "@mui/material"
import PageTitle from "./PageTitle"


const ProfilePageHead = ({ title, titleIcon, buttonText, buttonIcon, onClick, disabled }) => {

    return (
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
            <PageTitle
                title={title}
                titleIcon={titleIcon}
            />
            <Button
                variant='contained'
                disabled={disabled}
                startIcon={buttonIcon}
                sx={{ display: buttonText ? 'inline-flex' : 'none' }}
                onClick={onClick}
            >
                {buttonText}
            </Button>
        </Stack>
    )
}

export default ProfilePageHead