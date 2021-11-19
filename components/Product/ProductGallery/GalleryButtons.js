import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Image from 'next/image'
import { imageLoader } from '../../../utils/utils'

const GalleryButtons = ({images, handleClick}) => {

    return (
        <ButtonGroup>
            {
                images.map((image) => (
                    <Button key={image.id} sx={{padding: 0}}>
                        <Image
                            loader={imageLoader}
                            src={'products/' + image.src}
                            alt={image.src}
                            width={100}
                            height={125}
                            onClick={handleClick}
                        />
                    </Button>
                ))
            }
        </ButtonGroup>
    );
}

export default GalleryButtons