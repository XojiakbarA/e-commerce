import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import { Button, Card, CardContent, CardMedia, Grid, TextField } from '@mui/material'
import AvatarUpload from '../../components/common/AvatarUpload/AvatarUpload'
import UploadButton from '../../components/common/AvatarUpload/UploadButton'
import ProfileLayout from '../../components/layout/ProfileLayout/ProfileLayout'
import ProfileTitle from '../../components/profile/ProfileTitle'

const CreateShop = () => {

    return (
        <ProfileLayout>
            <ProfileTitle
                title='Create Shop'
                titleIcon={<AddBusinessIcon fontSize='large' />}
            />
            <Grid container>
                <Grid item xs={12}>
                    <Card sx={{position: 'relative'}}>
                        <UploadButton styles={{position: 'absolute', top: 0, left: 0}} title='Select background'/>
                        <CardMedia
                            component="img"
                            height="200"
                            image={'/images/shop/no-bg.jpeg'}
                            alt={'shop-bg'}
                        />
                        
                        <CardContent sx={{position: 'relative'}}>
                            <AvatarUpload styles={{marginTop: '-80px'}} title='Select Avatar'/>
                            <Grid container spacing={2}>
                                <Grid item lg={6}>
                                        <TextField
                                            label='First Name'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField
                                            label='First Name'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField
                                            label='Shop Title'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField
                                            label='Region'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField
                                            label='District'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField
                                            label='Street'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField
                                            label='Home Number'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={6}>
                                        <TextField
                                            label='Phone Number'
                                            size='small'
                                            fullWidth
                                        />
                                </Grid>
                                <Grid item lg={12}>
                                        <Button
                                            variant='contained'
                                            sx={{float: 'right'}}
                                        >Create</Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ProfileLayout>
    )
}

export default CreateShop