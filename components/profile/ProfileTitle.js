import { Stack, Typography, Button } from "@mui/material"
import Person from "@mui/icons-material/Person"
import EditIcon from '@mui/icons-material/Edit'

const ProfileTitle = () => {
    return (
        <Stack direction='row' justifyContent='space-between'>
            <Stack direction='row'>
                <Person fontSize='large' />
                <Typography variant='h4'>My Profile</Typography>
            </Stack>
            <Button variant='contained' startIcon={<EditIcon />}>
                Edit Profile
            </Button>
        </Stack>
    )
}

export default ProfileTitle