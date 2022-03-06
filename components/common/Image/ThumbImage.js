import { Avatar } from "@mui/material"
import Image from 'next/image'

const ThumbImage = ({ src, url, size, noImageIcon, ...others }) => {

    return (
        <Avatar { ...others } sx={{ width: size, height: size, position: 'relative' }}>
            {
                src
                ?
                <Image
                    src={url + src}
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