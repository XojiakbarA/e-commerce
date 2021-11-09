import { Grid, Stack, Button } from "@mui/material"
import Link from 'next/link'

const ShoppingLinks = ({back, forward}) => {
    return(
        <Grid item lg={12}>
            <Stack direction='row' spacing={4} justifyContent='center'>
                <Link href={back.path}>
                <a style={{width: '100%'}}>
                    <Button variant='outlined' fullWidth>{back.title}</Button>
                </a>
                </Link>
                <Link href={forward.path}>
                <a style={{width: '100%'}}>
                    <Button variant='contained' fullWidth>{forward.title}</Button>
                </a>
                </Link>
            </Stack>
        </Grid>
    )
}

export default ShoppingLinks