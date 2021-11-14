import { Stack, Button, Dialog, TextField, Typography, Box } from '@mui/material'
import Link from 'next/link'
import { connect } from 'react-redux'
import { closeLoginDialog } from '../../../../redux/actions/main'

const LoginDialog = ({ loginDialog, closeLoginDialog }) => {

    const isOpen = loginDialog.isOpen

    return(
        <Dialog open={isOpen} onClose={closeLoginDialog}>
            <Box sx={{marginX: {xs: 3, sm: 10}, marginY: {xs: 3, sm: 7}}}>
                <Typography variant='h5' textAlign='center' paddingBottom={5}>
                    Welcome to e-commerce
                </Typography>
                <Stack spacing={3}>
                    <TextField label='Email' size='small' />
                    <TextField label='Password' size='small' type='password' />
                    <Button variant='contained'>Login</Button>
                    <Typography variant='body1' textAlign='center'>
                        Don`t have Account? <Link href='/signup'><a style={{textDecoration: 'underline'}}> Sign Up </a></Link>
                    </Typography>
                    <Typography variant='body1' textAlign='center'>
                        Forgot your password? <Link href='/resetit'><a style={{textDecoration: 'underline'}}> Reset It </a></Link>
                    </Typography>
                </Stack>
            </Box>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    loginDialog: state.loginDialog
})

const mapDispatchToProps = dispatch => ({
    closeLoginDialog: () => dispatch(closeLoginDialog())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginDialog)