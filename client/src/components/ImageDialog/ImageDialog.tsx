import { AppBar, Container, Dialog, DialogContent, Grid, IconButton, Slide, Toolbar } from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions';
import { ArrowBackIos } from '@material-ui/icons';
import React, { ReactElement } from 'react'
import { RentalImage } from '../../shared/interfaces/Rental'
import './ImageDialog.scss'

interface Props {
    images: RentalImage[];
    open: boolean;
    onClose: () => void;
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ImageDialog({ images, open, onClose }: Props): ReactElement {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullScreen
            TransitionComponent={Transition}
        >
            <AppBar color='inherit' position='sticky' classes={{ root: 'ImageDialog-appbar' }}>
                <Toolbar>
                    <IconButton edge='start' color='inherit' onClick={onClose}><ArrowBackIos /></IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Container maxWidth='md'>
                    <Grid container spacing={1} justifyContent='center' alignItems='center' direction='column' className='ImageDialog-container'>
                        {
                            images.map(image => (
                                <Grid item key={image.fileName} >
                                    <img src={image.url} alt={image.fileName} className='ImageDialog-image' />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Container>
            </DialogContent>
        </Dialog>
    )
}

export default ImageDialog
