import {Box, Stack, Typography, Rating} from '@mui/material'
import { userImageURL } from '../../../utils/utils'
import ThumbImage from '../../common/Image/ThumbImage'

const ReviewItem = ({review}) => {
    return(
        <Box marginBottom={4}>
            <Stack direction='row' spacing={2} alignItems='center' marginBottom={1}>
                <ThumbImage
                    url={userImageURL}
                    src={review.user_image?.src}
                    size={35}
                />
                <Stack>
                    <Typography variant='subtitle2'>
                        {review.user_name}
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