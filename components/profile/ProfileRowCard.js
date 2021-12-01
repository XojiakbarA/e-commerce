import { Box, IconButton, Paper, Stack, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

const ProfileRowCard = ({col1, col2, col3}) => {
    return (
        <Paper sx={{paddingX: 2, paddingY: 3}}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='body2'>
                    {col1}
                </Typography>
                <Typography variant='body2'>
                    {col2}
                </Typography>
                <Typography variant='body2'>
                    {col3}
                </Typography>
                <Box>
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Stack>
        </Paper>
    )
}

export default ProfileRowCard