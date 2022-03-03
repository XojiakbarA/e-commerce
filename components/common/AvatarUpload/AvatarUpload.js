import { Avatar, Badge } from "@mui/material"
import UploadButton from "./UploadButton"

const AvatarUpload = ({ onChange, value, src, variant, size, styles, title, icon }) => {

    return (
        <Badge
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            badgeContent={
                <UploadButton
                    onChange={onChange}
                    value={value}
                    title={title}
                />
            }
            sx={styles}
        >
            <Avatar src={src} variant={variant} sx={{height: size, width: size}}>
                {icon}
            </Avatar>
        </Badge>
    )
}

export default AvatarUpload