import { Button } from "@mui/material"
import Link from 'next/link'

const NavigationItem = ({nav}) => {
    return(
        <Link href={nav.link}>
            <a style={{textDecoration: 'none'}} >
                <Button>{nav.title}</Button>
            </a>
        </Link>
    )
}

export default NavigationItem