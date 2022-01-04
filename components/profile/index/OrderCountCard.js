import { Paper, Typography } from "@mui/material"

const OrderCountCard = ({count, title}) => {

    return (
        <Paper sx={{paddingX: 2, paddingY: 3}}>
            <Typography variant='h6' textAlign='center'>
                {count}
            </Typography>
            <Typography variant='body2' align='center'>
                {title}
            </Typography>
        </Paper>
    )
}

export default OrderCountCard