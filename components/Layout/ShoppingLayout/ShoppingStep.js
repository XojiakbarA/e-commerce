import { Box, Step, StepButton, Stepper } from "@mui/material"
import NextLink from '../../common/Link'
import { useRouter } from 'next/router'

const steps = [
    {path: '/cart', title: 'Cart'},
    {path: '/checkout', title: 'Checkout'},
    {path: '/review', title: 'Review'}
]


const ShoppingStep = () => {

    const router = useRouter()
    const activeStep = steps.findIndex(step => step.path == router.asPath)

    return(
        <Box sx={{width: '100%', marginBottom: 3}}>
            <Stepper nonLinear activeStep={activeStep}>
                {
                    steps.map((step, i) => (
                        <Step key={i}>
                            <NextLink href={step.path}>
                                <StepButton color='inherit'>
                                    {step.title}
                                </StepButton>
                            </NextLink>
                        </Step>
                    ))
                }
            </Stepper>
        </Box>
    )
}

export default ShoppingStep