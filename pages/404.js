import { Box, Button, Divider, Stack, Typography } from "@mui/material"
import BaseLink from '../components/common/Link/BaseLink'

const My404 = () => {

    return (
        <Box
            width='100%'
            height='100vh'
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Stack
                spacing={2}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    divider={<Divider orientation='vertical' flexItem/>}
                >
                    <Typography variant='h6'>404</Typography>
                    <Typography variant='body2'>This page could not be found.</Typography>
                </Stack>
                <Button
                    variant='outlined'
                    size='small'
                    href='/'
                    component={BaseLink}
                >Go Home</Button>
            </Stack>
        </Box>
    )
}

export default My404