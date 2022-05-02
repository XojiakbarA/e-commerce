import { Button, Grid, Box, Typography, Stack, Card } from '@mui/material'
import Image from 'next/image'
import { appURL } from '../../../utils/utils'

const BannerItem = ({banner}) => {
    return (
        <Card elevation={5}>
            <Grid container spacing={0} padding={2}>
                <Grid item lg={6} display='flex' alignItems='center'>
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
                <Grid item lg={6}>
                    <Box sx={{
                            position: 'relative',
                            width: 450,
                            height: 450,
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            src={appURL + banner.image}
                            alt={banner.image}
                            layout='fill'
                            objectFit='cover'
                            priority
                        />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

export default BannerItem