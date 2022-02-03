import { Stack, Typography, Button } from "@mui/material"

const PageTitle = ({title, titleIcon, buttonText, buttonIcon, onClick, disabled}) => {
    return (
        <Stack direction='row' justifyContent='space-between' marginBottom={2}>
            <Stack direction='row' spacing={1} alignItems='center'>
                {titleIcon}
                <Typography variant='h4'>{title}</Typography>
            </Stack>
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

export default PageTitle