import React, { ReactElement, useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import { userQueryDetailRental } from '../../../react-query/useQueryRental';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Container, Divider, Grid, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading';
import './RentalDetail.scss';
import ImageDialog from '../../ImageDialog/ImageDialog';
import { Delete, Edit, Star } from '@material-ui/icons';
import { useQueryListReviewsByRental } from '../../../react-query/useQueryReview';
import ReviewItem from '../ReviewItem/ReviewItem';
import ReviewDialog from '../../ReviewDialog/ReviewDialog';
import LeaveReviewDialog from '../../LeaveReviewDialog/LeaveReviewDialog';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/root-reducer';
import { MAPBOX_TOKEN } from '../../../shared/constants/MapBox';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { ViewportProps } from 'react-map-gl/src/utils/transition-manager';
import { ROUTES } from '../../../routes/routes';
import Swal from 'sweetalert2';
import feathersClient from '../../../API/feathersClient';
import { FeatherServices } from '../../../API/featherServices';
import { fetchDataBegin, fetchDataStop } from '../../../redux/fetching.slices/fetching.slices';
import { errorMessageReturn } from '../../../utils/errorMesageReturnUtils';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface MapViewPort {
    longitude: number | undefined;
    latitude: number | undefined;
    zoom: number | undefined;
}

function RentalDetail(): ReactElement {
    const theme = useTheme();
    const matchMdDown = useMediaQuery(theme.breakpoints.down('md'));
    
    const { rentalId } = useParams<{ rentalId: string }>()
    const history = useHistory()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state: RootState) => state.user)

    const { data: rentalDetail, isLoading: isRentalLoading, refetch: refetchRentalDetail } = userQueryDetailRental(rentalId)
    const { data: reviews, isLoading: isReviewLoading, refetch: refetchReviews } = useQueryListReviewsByRental(rentalId)
    const [isOpenImageDialog, setIsOpenImageDialog] = useState<boolean>(false)
    const [isShowingAllReviews, setIsShowingAllReviews] = useState<boolean>(false)
    const [isLeavingAReview, setIsLeavingAReview] = useState<boolean>(false)
    const [viewPort, setViewPort] = useState<MapViewPort>({ longitude: 0, latitude: 0, zoom: 14 })

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

    const handleClickEdit = () => {
        history.push(ROUTES._RENTAL_DETAIL_EDIT(rentalId))
    }

    const handleClickDelete = async () => {
        const result = await Swal.fire({
            title: 'Delete rental?',
            text: 'Are you sure you want to delete this rental?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete away!',
            confirmButtonColor: 'red'
        })

        if (result.isConfirmed) {
            try {
                dispatch(fetchDataBegin())
                await feathersClient.service(FeatherServices.rentals).remove(rentalId)
                dispatch(fetchDataStop())
                history.push(ROUTES._RENTAL)
            } catch (error) {
                Swal.fire({
                    title: 'Failed to delete'!,
                    text: errorMessageReturn(error),
                    icon: 'error'
                })
            }

        }
    }

    useEffect(() => {
        if (rentalDetail) {
            setViewPort({
                longitude: rentalDetail.geometry.coordinates[0],
                latitude: rentalDetail.geometry.coordinates[1],
                zoom: 14,
            })
        }
    }, [rentalDetail])

    const handleMapMove = (data: ViewportProps) => {
        setViewPort({
            latitude: data.latitude,
            longitude: data.longitude,
            zoom: data.zoom
        })
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
                    <Grid item xs={12}>
                        {
                            rentalDetail.images.length === 0
                                ? <React.Fragment />
                                : <div className="RentalDetail-image-container">
                                    <div onClick={handleOpenImageDialog} className="first">
                                        <img src={rentalDetail.images[0].url} alt={rentalDetail.images[0].fileName} />
                                    </div>
                                    {rentalDetail.images[1]
                                        ? <div onClick={handleOpenImageDialog} className="sec">
                                            <img src={rentalDetail.images[1].url} alt={rentalDetail.images[1].fileName} />
                                        </div>
                                        : <div />
                                    }
                                    {rentalDetail.images[2]
                                        ? <div onClick={handleOpenImageDialog} className="third">
                                            <img src={rentalDetail.images[2].url} alt={rentalDetail.images[2].fileName} />
                                        </div>
                                        : <div />
                                    }
                                    {rentalDetail.images[3]
                                        ? <div onClick={handleOpenImageDialog} className="fourth">
                                            <img src={rentalDetail.images[3].url} alt={rentalDetail.images[3].fileName} />
                                        </div>
                                        : <div />
                                    }
                                    {rentalDetail.images[4]
                                        ? <div onClick={handleOpenImageDialog} className="fifth">
                                            <img src={rentalDetail.images[4].url} alt={rentalDetail.images[4].fileName} />
                                        </div>
                                        : <div />
                                    }
                                    <span className='RentalDetail-image-quantity'>1/{rentalDetail.images.length} photos</span>
                                </div>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <div className='RentalDetail-content'>
                            <Typography variant='h6'>Hosted by {`${rentalDetail.user?.firstName} ${rentalDetail.user?.lastName}`}</Typography>
                            <Typography color='textSecondary'>{rentalDetail.spec.bed} bed{rentalDetail.spec.bed > 1 ? 's' : ''} ⋅ {rentalDetail.spec.bath} bath{rentalDetail.spec.bath > 1 ? 's' : ''} </Typography>
                            <Typography variant='h5' display='inline'>
                                ${rentalDetail.price}
                                <Typography display='inline'> / night</Typography>
                            </Typography>
                            {currentUser && currentUser._id === rentalDetail.user._id &&
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button variant='outlined' color='primary' onClick={handleClickEdit} startIcon={<Edit />}>Edit</Button>
                                    </Grid>
                                    <Grid item>
                                        <Button variant='outlined' color='secondary' onClick={handleClickDelete} startIcon={<Delete />}>Delete</Button>
                                    </Grid>
                                </Grid>
                            }
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
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item>
                                <Typography variant='h6'>Where you'll be</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <ReactMapGL
                                    width='100%'
                                    height={matchMdDown ? '20rem' : '30rem'}
                                    className='RentalDetail-map'
                                    {...viewPort}
                                    mapboxApiAccessToken={MAPBOX_TOKEN}
                                    onViewportChange={handleMapMove}
                                    mapStyle='mapbox://styles/mapbox/streets-v11'
                                >
                                    <Marker latitude={rentalDetail.geometry.coordinates[1]} longitude={rentalDetail.geometry.coordinates[0]} offsetLeft={-20} offsetTop={-10}>
                                        <LocationOnIcon fontSize='large' color='secondary' />
                                    </Marker>
                                </ReactMapGL>
                            </Grid>
                        </Grid>
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
