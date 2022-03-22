import {Paper, Box, Stepper, Step, Typography, Stack, StepButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PhotoIcon from '@mui/icons-material/Photo'
import { shopImageURL } from "../../../utils/utils";
import ThumbImage from "../../common/Image/ThumbImage";
import { toggleCancelOrderDialog } from "../../../app/store/actions/dialogActions";
import { useDispatch } from "react-redux";

const OrderStatus = ({subOrder}) => {

    const dispatch = useDispatch()

    const { status, title, image } = subOrder

    const cancelText = `Are you sure you want to cancel the "${title}" order?`

    const openCancelOrderDialog = () => {
        dispatch(toggleCancelOrderDialog(true, cancelText, subOrder.id))
    }

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
                    <ThumbImage
                        url={shopImageURL}
                        src={image?.src}
                        noImageIcon={<PhotoIcon/>}
                    />
                    <Typography variant="h6">
                        {title}
                    </Typography>
                </Stack>
                <Box sx={{ width: '70%' }}>
                    <Stepper activeStep={status === 'pending' ? 0 : -1}>
                        {steps.map((step) => (
                            <Step key={step.label}>
                                <StepButton icon={step.icon} onClick={ openCancelOrderDialog }>
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