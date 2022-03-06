import { Stack } from "@mui/material"
import ButtonLink from "../Link/ButtonLink"

const ButtonMenu = ({ menu }) => {

    return(
        <Stack spacing={2} direction='row'>
            {
                menu.map(item => (
                    <ButtonLink
                        key={item.title}
                        href={item.href}
                        text={item.title}
                        textVariant='button'
                    />
                ))
            }
        </Stack>
    )
}

export default ButtonMenu