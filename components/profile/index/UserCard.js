import { Paper, Stack, Typography, Avatar } from "@mui/material"
import Image from 'next/image'
import { noAvImageUrl, userImageURL } from "../../../utils/utils"

const UserCard = ({image, firstName, lastName}) => {

    return (
        <Paper sx={{paddingX: 2, height: '100%', alignItems: 'center', display: 'flex'}}>
            <Stack direction='row' spacing={2} alignItems='center'>
                <Avatar sx={{width: 70, height: 70}}>
                    <Image
                        src={image ? userImageURL + image : noAvImageUrl}
                        alt={firstName}
                        layout='fill'
                        objectFit='cover'
                    />
                </Avatar>
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