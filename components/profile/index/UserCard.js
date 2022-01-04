import { Paper, Stack, Typography, Avatar } from "@mui/material"
import { userImageURL } from "../../../utils/utils"

const UserCard = ({image, firstName, lastName}) => {

    return (
        <Paper sx={{paddingX: 2, height: '100%', alignItems: 'center', display: 'flex'}}>
            <Stack direction='row' spacing={2} alignItems='center'>
                <Avatar src={userImageURL + image} alt={image} sx={{width: 70, height: 70}}/>
                <Stack>
                <Typography variant='h5'>
                    {firstName}
                </Typography>
                <Typography variant='body2'>
                    {lastName}
                </Typography>
                </Stack>
            </Stack>
        </Paper>
    )
}

export default UserCard