import React, { ReactElement, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import { userQueryDetailRental } from '../../../react-query/useQueryRental';
import { useParams } from 'react-router-dom';
import { Container, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading';
import './RentalDetail.scss';
import ImageDialog from '../../ImageDialog/ImageDialog';
import { Star } from '@material-ui/icons';

function RentalDetail(): ReactElement {
    const { rentalId } = useParams<{ rentalId: string }>()
    const { data: rentalDetail, isLoading } = userQueryDetailRental(rentalId)
    const [isOpenImageDialog, setIsOpenImageDialog] = useState<boolean>(false)

    const handleCloseImageDialog = () => {
        setIsOpenImageDialog(false)
    }

    const handleOpenImageDialog = () => {
        setIsOpenImageDialog(true)
    }

    if (isLoading) {
        return <SkeletonLoading />
    }
    if (!rentalDetail) {
        return <Typography variant='h3'>Failed to load data...</Typography>
    }
    return (
        <div>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Hidden xsDown>
                        <Grid item xs={12}>
                            <Typography variant='h5'>{rentalDetail.name}</Typography>
                            <Typography variant='caption' color='textSecondary'><LocationOnIcon fontSize='small' />{rentalDetail.address}</Typography>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12}>
                        {
                            rentalDetail.images.length === 0
                                ? <React.Fragment />
                                : <div className="RentalDetail-image-container">
                                    <div onClick={handleOpenImageDialog} className="first">
                                        <img src={rentalDetail.images[0].url} alt={rentalDetail.images[0].fileName} />
                                        {/* <div className='overlay' /> */}
                                    </div>
                                    {rentalDetail.images[1]
                                        ? <div onClick={handleOpenImageDialog} className="sec">
                                            <img src={rentalDetail.images[1].url} alt={rentalDetail.images[1].fileName} />
                                            {/* <div className='overlay' /> */}
                                        </div>
                                        : <React.Fragment />
                                    }
                                    {rentalDetail.images[2]
                                        ? <div onClick={handleOpenImageDialog} className="third">
                                            <img src={rentalDetail.images[2].url} alt={rentalDetail.images[2].fileName} />
                                            {/* <div className='overlay' /> */}
                                        </div>
                                        : <React.Fragment />
                                    }
                                    {rentalDetail.images[3]
                                        ? <div onClick={handleOpenImageDialog} className="fourth">
                                            <img src={rentalDetail.images[3].url} alt={rentalDetail.images[3].fileName} />
                                            {/* <div className='overlay' /> */}
                                        </div>
                                        : <React.Fragment />
                                    }
                                    {rentalDetail.images[4]
                                        ? <div onClick={handleOpenImageDialog} className="fifth">
                                            <img src={rentalDetail.images[4].url} alt={rentalDetail.images[4].fileName} />
                                            {/* <div className='overlay' /> */}
                                        </div>
                                        : <React.Fragment />
                                    }
                                    <span className='RentalDetail-image-quantity'>1/{rentalDetail.images.length} photos</span>
                                </div>
                        }
                    </Grid>
                    <Hidden smUp>
                        <Grid item xs={12}>
                            <Typography variant='h5'>{rentalDetail.name}</Typography>
                            <Typography variant='caption' color='textSecondary'><LocationOnIcon fontSize='small' />{rentalDetail.address}</Typography>
                            <Divider />
                        </Grid>
                    </Hidden>
                    <Grid item xs={12}>
                        <div className='RentalDetail-content'>
                            <Typography variant='h6'>Hosted by {`${rentalDetail.user?.firstName} ${rentalDetail.user?.lastName}`}</Typography>
                            <Typography color='textSecondary'>{rentalDetail.spec.bed} bed{rentalDetail.spec.bed > 1 ? 's' : ''} ⋅ {rentalDetail.spec.bath} bath{rentalDetail.spec.bath > 1 ? 's' : ''} </Typography>
                            <Typography variant='h5' display='inline'>
                                ${rentalDetail.price}
                                <Typography display='inline'> / night</Typography>
                            </Typography>
                        </div>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='RentalDetail-content'>
                            <Typography variant='h6' gutterBottom>About this place</Typography>
                            <Typography variant='subtitle1' color='textSecondary' style={{ paddingLeft: '2rem' }}>{rentalDetail.description}</Typography>
                        </div>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <div className='RentalDetail-content'>
                            <Grid container spacing={0} alignItems='center'>
                                <Grid item>
                                    <Star color={rentalDetail.rating > 4 ? 'secondary' : 'inherit'} />
                                </Grid>
                                <Grid item>
                                    <Typography variant='h6' >
                                        {rentalDetail.rating ? ` ${parseFloat(rentalDetail.rating.toString()).toFixed(2)} (${rentalDetail.numberReviews} reviews)` : 'No Review (yet)'}
                                    </Typography>
                                </Grid>
                            </Grid>


                        </div>
                        <Divider />
                    </Grid>
                </Grid>
            </Container>
            <ImageDialog images={rentalDetail.images} open={isOpenImageDialog} onClose={handleCloseImageDialog} />
        </div>
    )
}

export default RentalDetail
