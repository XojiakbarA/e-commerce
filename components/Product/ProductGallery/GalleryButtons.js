import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Image from 'next/image'
import { productImageURL } from '../../../utils/utils'

const GalleryButtons = ({state, images, handleClick}) => {

    return (
        <ButtonGroup>
            {
                images.map((image) => (
                    <Button
                        key={image.id}
                        sx={{
                            padding: 0.1,
                            '&:hover': {
                                transform: 'scale(1.08)',
                                zIndex: 1
                            },
                            transform: state === image.src ? 'scale(1.08)' : 'scale(1)',
                            zIndex: state === image.src ? 1 : 0,
                            transition: '0.2s ease'
                        }}
                        variant='contained'
                    >
                        <Image
                            src={productImageURL + image.src}
                            alt={image.src}
                            width={100}
                            height={125}
                            onClick={ () => handleClick(image.src) }
                        />
                    </Button>
                ))
            }
        </ButtonGroup>
    );
}

export default GalleryButtons