import { Box, TextField } from "@mui/material"

const AdditionalComments = () => {
    return(
        <Box>
            <TextField label='Additional Comments' multiline rows={5} fullWidth />
        </Box>
    )
}

export default AdditionalComments