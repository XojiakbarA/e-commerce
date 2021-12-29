import {Paper, Box, Stepper, Step, StepLabel} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const OrderStatus = ({status}) => {

    const steps = [
        {label: 'Pending', icon: (<PendingIcon fontSize='large' color={status == 'pending' ? 'primary' : 'disabled'}/>)},
        {label: 'Shipped', icon: (<LocalShippingIcon fontSize='large' color={status == 'shipped' ? 'primary' : 'disabled'}/>)},
        {label: 'Delivered', icon: (<CheckBoxIcon fontSize='large' color={status == 'delivered' ? 'primary' : 'disabled'}/>)},
        {label: 'Cancelled', icon: (<CancelIcon fontSize='large' color={status == 'cancelled' ? 'error' : 'disabled'}/>)}
    ];

    return (
        <Paper sx={{ paddingY: 5 }}>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={1} alternativeLabel>
                    {steps.map((step) => (
                        <Step key={step.label}>
                            <StepLabel icon={step.icon}>{step.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Paper>
    )
}

export default OrderStatus