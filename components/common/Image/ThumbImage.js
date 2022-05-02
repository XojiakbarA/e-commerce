import { Avatar } from "@mui/material"
import Image from 'next/image'
import { appURL } from "../../../utils/utils"

const ThumbImage = ({ src, size, noImageIcon, ...others }) => {

    return (
        <Avatar { ...others } sx={{ width: size, height: size, position: 'relative' }}>
            {
                src
                ?
                <Image
                    src={appURL + src}
                    alt={src}
                    layout='fill'
                    objectFit='cover'
                />
                :
                noImageIcon
            }
        </Avatar>
    )
}

export default ThumbImage