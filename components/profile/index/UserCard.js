import { Paper, Stack, Typography } from "@mui/material"
import { userImageURL } from "../../../utils/utils"
import ThumbImage from "../../common/Image/ThumbImage"

const UserCard = ({image, firstName, lastName}) => {

    return (
        <Paper sx={{paddingX: 2, height: '100%', alignItems: 'center', display: 'flex'}}>
            <Stack direction='row' spacing={2} alignItems='center'>
                <ThumbImage
                    url={userImageURL}
                    src={image?.src}
                    size={70}
                />
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