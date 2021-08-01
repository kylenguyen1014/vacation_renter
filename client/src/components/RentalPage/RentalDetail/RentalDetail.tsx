import React, { ReactElement, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import { userQueryDetailRental } from '../../../react-query/useQueryRental';
import { useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Hidden, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading';
import './RentalDetail.scss';
import ImageDialog from '../../ImageDialog/ImageDialog';
import { Star } from '@material-ui/icons';
import { useQueryListReviewsByRental } from '../../../react-query/useQueryReview';
import ReviewItem from '../ReviewItem/ReviewItem';
import ReviewDialog from '../../ReviewDialog/ReviewDialog';
import LeaveReviewDialog from '../../LeaveReviewDialog/LeaveReviewDialog';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/root-reducer';

function RentalDetail(): ReactElement {
    const { rentalId } = useParams<{ rentalId: string }>()
    const { currentUser } = useSelector((state: RootState) => state.user)
    const { data: rentalDetail, isLoading: isRentalLoading, refetch: refetchRentalDetail } = userQueryDetailRental(rentalId)
    const { data: reviews, isLoading: isReviewLoading, refetch: refetchReviews } = useQueryListReviewsByRental(rentalId)
    const [isOpenImageDialog, setIsOpenImageDialog] = useState<boolean>(false)
    const [isShowingAllReviews, setIsShowingAllReviews] = useState<boolean>(false)
    const [isLeavingAReview, setIsLeavingAReview] = useState<boolean>(false)

    const handleCloseImageDialog = () => {
        setIsOpenImageDialog(false)
    }

    const handleOpenImageDialog = () => {
        setIsOpenImageDialog(true)
    }

    const handleOpenShowAllReviews = () => {
        setIsShowingAllReviews(true)
    }

    const handleCloseShowAllReviews = () => {
        setIsShowingAllReviews(false)
    }

    const handleOpenLeavingReview = () => {
        setIsLeavingAReview(true)
    }


    const handleCloseLeavingReview = () => {
        setIsLeavingAReview(false)
    }

    const handleRefresh = () => {
        refetchRentalDetail()
        refetchReviews()
    }

    if (isRentalLoading || isReviewLoading) {
        return <SkeletonLoading />
    }
    if (!rentalDetail || !reviews) {
        return <Typography variant='h3'>Failed to load data...</Typography>
    }
    return (
        <div>
            <Container maxWidth='lg'>
                <Grid container spacing={3}>
                    <Hidden xsDown>
                        <Grid item xs={12}>
                            <Grid container alignItems='center'>
                                <Grid item xs={12}>
                                    <Typography variant='h5'>{rentalDetail.name}</Typography>
                                </Grid>
                                <Grid item container spacing={1}>
                                    <Grid item>
                                        <div onClick={handleOpenShowAllReviews}>
                                            <Grid container spacing={0} alignItems='center' className='RentalDetail-rating'>
                                                <Grid item>
                                                    <Star color={rentalDetail.rating > 4 ? 'secondary' : 'inherit'} fontSize='small' />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='subtitle2' >
                                                        {rentalDetail.rating ? ` ${parseFloat(rentalDetail.rating.toString()).toFixed(2)} (${rentalDetail.numberReviews} reviews)` : 'No Review (yet)'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='caption' color='textSecondary'> <LocationOnIcon fontSize='small' />{rentalDetail.address}</Typography>

                                    </Grid>
                                </Grid>
                            </Grid>
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
                        <Grid container alignItems='center'>
                            <Grid item xs={12}>
                                <Typography variant='h5'>{rentalDetail.name}</Typography>
                            </Grid>
                            <Grid item container spacing={1}>
                                <Grid item>
                                    <div onClick={handleOpenShowAllReviews}>
                                        <Grid container spacing={0} alignItems='center' className='RentalDetail-rating'>
                                            <Grid item>
                                                <Star color={rentalDetail.rating > 4 ? 'secondary' : 'inherit'} fontSize='small' />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant='subtitle2' >
                                                    {rentalDetail.rating ? ` ${parseFloat(rentalDetail.rating.toString()).toFixed(2)} (${rentalDetail.numberReviews} reviews)` : 'No Review (yet)'}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </Grid>
                                <Grid item>
                                    <Typography variant='caption' color='textSecondary'> <LocationOnIcon fontSize='small' />{rentalDetail.address}</Typography>

                                </Grid>
                            </Grid>
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
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {
                                reviews.data.map(review => (
                                    <Grid item key={review._id} xs={12} lg={6}>
                                        <ReviewItem review={review} />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={1}>
                        {currentUser &&
                            <Grid item>
                                <Button variant='outlined' onClick={handleOpenLeavingReview}>Leave a review</Button>
                            </Grid>
                        }
                        {
                            reviews.total > reviews.data.length &&
                            <Grid item>
                                <Button variant='outlined' onClick={handleOpenShowAllReviews}>Show all {reviews.total} reviews</Button>
                            </Grid>
                        }
                    </Grid>
                </Grid>
            </Container>
            {isShowingAllReviews && <ReviewDialog open={isShowingAllReviews} onClose={handleCloseShowAllReviews} rentalDetail={rentalDetail} totalReviews={rentalDetail.numberReviews} />}
            <ImageDialog images={rentalDetail.images} open={isOpenImageDialog} onClose={handleCloseImageDialog} />
            <LeaveReviewDialog open={isLeavingAReview} onClose={handleCloseLeavingReview} rentalId={rentalId} refetchReviews={handleRefresh} />
        </div>
    )
}

export default RentalDetail
