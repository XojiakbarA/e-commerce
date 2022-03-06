import { Button, Typography } from "@mui/material"
import BaseLink from "./BaseLink"

const ButtonLink = ({ href, text, textVariant, color }) => {

    return (
        <Button
            variant='text'
            color={color}
            component={BaseLink}
            href={href}
        >
            <Typography variant={textVariant}>
                {text}
            </Typography>
        </Button>
    )
}

export default ButtonLink