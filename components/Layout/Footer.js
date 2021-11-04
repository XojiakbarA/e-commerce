import {AppBar, Box, Toolbar, Typography,
        Button, Container, Grid, Stack} from '@mui/material'
import Image from 'next/image'

import AppLogo from '../AppLogo'
import MenuIcon from '../Menu/MenuIcon'

import googlePlay from '../../public/images/google-play.png'
import appStore from '../../public/images/app-store.png'

import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube';

const social = [
    {id: 1, title: 'Facebook', icon: (<FacebookIcon />)},
    {id: 2, title: 'Instagram', icon: (<InstagramIcon />)},
    {id: 3, title: 'Twitter', icon: (<TwitterIcon />)},
    {id: 4, title: 'YouTube', icon: (<YouTubeIcon />)}
]

const Footer = () => {
    return (
        <AppBar position="static" color="inherit" sx={{ marginTop: 3, display: {xs: 'none', sm: 'block'} }}>
            <Container maxWidth='xl'>
                <Toolbar sx={{padding: 3}}>
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
                            <MenuIcon menu={social} />
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Footer