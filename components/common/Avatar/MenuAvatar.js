import { Avatar } from "@mui/material"
import Image from 'next/image'
import { userImageURL } from "../../../utils/utils"

const MenuAvatar = ({ image, size }) => {

    return (
        <Avatar sx={{ width: size, height: size, position: 'relative' }}>
            {
                image &&
                <Image
                    src={userImageURL + image.src}
                    alt={image && 'avatar'}
                    layout='fill'
                    objectFit='cover'
                />
            }
        </Avatar>
    )
}

export default MenuAvatar