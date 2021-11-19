import { Button, Grid, Box } from '@mui/material'
import Image from 'next/image'
import { imageLoader } from '../../../utils/utils'

const BannerItem = ({banner}) => {
    return (
        <Grid container spacing={0}
            sx={{
                boxShadow: 3,
                borderRadius: 2,
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
                    display: {sm: 'block'}
                }}
            >
                <Image loader={imageLoader} src={'banners/' + banner.image} alt={banner.image} width={450} height={450} />
            </Grid>
        </Grid>
    )
}

export default BannerItem