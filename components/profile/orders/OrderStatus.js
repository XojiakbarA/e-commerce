import {Paper, Box, Stepper, Step, Typography, Stack, Avatar, StepButton} from "@mui/material";
import Image from 'next/image'
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useToggle } from "../../../app/hooks/useToggle";
import { noAvImageUrl, shopImageURL } from "../../../utils/utils";

const OrderStatus = ({orderShop}) => {

    const { status, title, image } = orderShop

    const { openConfirmDialog } = useToggle()

    const steps = [
        {
            label: status === 'cancelled'? 'Cancelled' : 'Cancel',
            icon: (<CancelIcon color={status == 'pending' ? 'inherit' : status === 'cancelled' ? 'error' : 'disabled'}/>)
        },
        {label: 'Pending', icon: (<PendingIcon color={status == 'pending' ? 'primary' : 'disabled'}/>)},
        {label: 'Shipped', icon: (<LocalShippingIcon color={status == 'shipped' ? 'primary' : 'disabled'}/>)},
        {label: 'Delivered', icon: (<CheckBoxIcon color={status == 'delivered' ? 'primary' : 'disabled'}/>)}
    ];

    return (
        <Paper sx={{ paddingX: 2, paddingY: 4 }}>
            <Stack direction='row' spacing={2} justifyContent='space-between' alignItems='center'>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <Avatar>
                        <Image
                            src={image ? shopImageURL + image : noAvImageUrl}
                            alt={title}
                            layout='fill'
                        />
                    </Avatar>
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Stack>
                <Box sx={{ width: '70%' }}>
                    <Stepper activeStep={status === 'pending' ? 0 : -1}>
                        {steps.map((step) => (
                            <Step key={step.label}>
                                <StepButton icon={step.icon} onClick={() => openConfirmDialog(orderShop)}>
                                    <Typography variant="caption">
                                        {step.label}
                                    </Typography>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Stack>
        </Paper>
    )
}

export default OrderStatus