import { AppBar, Toolbar, Typography, Button, Container, Grid, Stack, Box, IconButton, Tooltip } from '@mui/material'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'

import Image from 'next/image'
import AppLogo from '../AppLogo'

import googlePlay from '../../../public/images/logo/google-play.png'
import appStore from '../../../public/images/logo/app-store.png'


const menu = {
    facebook: {id: 1, title: 'Facebook'},
    instagram: {id: 2, title: 'Instagram'},
    twitter: {id: 3, title: 'Twitter'},
    youtube: {id: 4, title: 'YouTube'}
}

const Footer = () => {
    return (
        <AppBar position="static" color="inherit" sx={{ marginTop: 3, display: {xs: 'none', sm: 'block'} }}>
            <Container maxWidth='xl'>
                <Toolbar sx={{ padding: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item lg={8}>
                            <AppLogo />
                            <Typography variant='body1' gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et lectus vel ut sollicitudin elit at amet.
                            </Typography>
                            <Stack spacing={2} direction='row'>
                                <Button sx={{padding: 0, width: 150}}>
                                    <Image src={googlePlay} alt='google-play'/>
                                </Button>
                                <Button sx={{padding: 0, width: 150}}>
                                    <Image src={appStore} alt='app-store'/>
                                </Button>
                            </Stack>
                        </Grid>
                        <Grid item lg={4}>
                            <Typography variant='h5' gutterBottom>
                                Contact Us
                            </Typography>
                            <Typography variant='body2'>
                                70 Washington Square South, New York, NY 10012, United States
                            </Typography>
                            <Typography variant='body2'>
                                Email: uilib.help@gmail.com
                            </Typography>
                            <Typography variant='body2'>
                                Phone: +1 1123 456 780
                            </Typography>
                            <Box sx={{ display:'flex' }}>
                                <IconButton size="large" color="inherit">
                                    <Tooltip title={ menu.facebook.title } >
                                            <FacebookIcon/>
                                    </Tooltip>
                                </IconButton>
                                <IconButton size="large" color="inherit">
                                    <Tooltip title={ menu.instagram.title } >
                                            <InstagramIcon/>
                                    </Tooltip>
                                </IconButton>
                                <IconButton size="large" color="inherit">
                                    <Tooltip title={ menu.twitter.title } >
                                            <TwitterIcon/>
                                    </Tooltip>
                                </IconButton>
                                <IconButton size="large" color="inherit">
                                    <Tooltip title={ menu.youtube.title } >
                                            <YouTubeIcon/>
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Footer