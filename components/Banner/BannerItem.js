import { Button, Grid, Container, Box } from '@mui/material'
import Image from 'next/image'

const BannerItem = ({banner}) => {
    return (
        <Container>
            <Grid container spacing={0}
                sx={{
                    boxShadow: 3,
                    borderRadius: 6,
                    marginTop: {xs: 9, lg: 3},
                    backgroundColor: 'white',
                    position: 'relative', 
                    overflow: 'hidden'
                }}
            >
                <Grid item lg={6}
                    sx={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                        position: {xs: 'absolute', sm: 'static'},
                        height: {xs: '100%', sm: 'auto'},
                        zIndex: 1,
                        backgroundColor: {xs: 'rgba(117, 117, 117, 0.3)', sm: 'transparent'}
                    }}
                >
                    <Box sx={{padding: 2}}>
                        <h2>{banner.title}</h2>
                        <p>{banner.description}</p>
                        
                        <Button variant='contained'>
                            Check it out!
                        </Button>
                    </Box>
                </Grid>
                <Grid item lg={6}
                    sx={{
                        padding: 2,
                        display: {sm: 'block'},
                    }}
                >
                    <Image src={banner.image} alt='img' />
                </Grid>
            </Grid>
        </Container>
    )
}

export default BannerItem