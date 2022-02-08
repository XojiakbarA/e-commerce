import {Box, Avatar, Stack, Typography, Rating} from '@mui/material'
import Image from 'next/image'
import { userImageURL } from '../../utils/utils'

const ReviewItem = ({review}) => {
    return(
        <Box marginBottom={4}>
            <Stack direction='row' spacing={2} alignItems='center' marginBottom={1}>
                <Avatar>
                    {
                        review.image &&
                        <Image
                            src={userImageURL + review.image.src}
                            alt={review.image}
                            layout='fill'
                            objectFit='cover'
                        />
                    }
                </Avatar>
                <Stack>
                    <Typography variant='subtitle2'>
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