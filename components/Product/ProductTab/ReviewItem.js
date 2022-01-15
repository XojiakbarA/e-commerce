import {Box, Avatar, Stack, Typography, Rating} from '@mui/material'
import { userImageURL } from '../../../utils/utils'

const ReviewItem = ({review}) => {
    return(
        <Box marginBottom={4}>
            <Stack direction='row' spacing={2} alignItems='center' marginBottom={1}>
                <Avatar src={review.image ? userImageURL + review.image : undefined}/>
                <Stack>
                    <Typography variant='body1'>
                        {review.name}
                    </Typography>
                    <Stack direction='row' alignItems='center' spacing={2}>
                        <Rating name='review' size='small' value={review.rating} readOnly />
                        <Typography variant='caption'>
                            {review.created_at}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Typography variant='body2'>
                {review.text}
            </Typography>
        </Box>
    )
}

export default ReviewItem