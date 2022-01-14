import { Button, Grid, Box, Typography, Stack } from '@mui/material'
import Image from 'next/image'
import { bannerImageURL } from '../../../utils/utils'

const styles = {
    container: {
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        position: 'relative', 
        overflow: 'hidden'
    },
    leftItem: {
        padding: 2,
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        position: {xs: 'absolute', sm: 'static'},
        height: {xs: '100%', sm: 'auto'},
        zIndex: 1,
        backgroundColor: {xs: 'rgba(117, 117, 117, 0.3)', sm: 'transparent'}
    },
    rightItem: {
        padding: 2,
        display: {sm: 'block'}
    }
}

const BannerItem = ({banner}) => {
    return (
        <Grid container spacing={0} sx={styles.container}>
            <Grid item lg={6} sx={styles.leftItem}>
                <Stack spacing={2}>
                    <Typography variant='h4'>
                        {banner.title}
                    </Typography>
                    <Typography variant='body2'>
                        {banner.description}
                    </Typography>
                    <Box>
                        <Button variant='contained'>
                            Check it out!
                        </Button>
                    </Box>
                </Stack>
            </Grid>
            <Grid item lg={6} sx={styles.rightItem}>
                <Image
                    src={bannerImageURL + banner.image}
                    alt={banner.image}
                    width={450}
                    height={450}
                    priority
                />
            </Grid>
        </Grid>
    )
}

export default BannerItem