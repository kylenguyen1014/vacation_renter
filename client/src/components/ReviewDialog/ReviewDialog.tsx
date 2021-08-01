import { Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from '@material-ui/core'
import { CancelOutlined, Star } from '@material-ui/icons'
import React, { ReactElement } from 'react'
import { useQueryListReviewsByRental } from '../../react-query/useQueryReview'
import { Rental } from '../../shared/interfaces/Rental'
import ReviewItem from '../RentalPage/ReviewItem/ReviewItem'

interface Props {
    rentalDetail: Rental;
    totalReviews: number;
    open: boolean;
    onClose: () => void;
}

function ReviewDialog({ rentalDetail, totalReviews, open, onClose }: Props): ReactElement {
    const { data: reviews, isLoading } = useQueryListReviewsByRental(rentalDetail._id, totalReviews)

    if (isLoading) {
        return <React.Fragment />

    }
    if (!reviews) {
        onClose()
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth='sm'
            fullWidth
            scroll='paper'
        >
            <DialogTitle>
                <Grid container justifyContent='space-between' alignItems='center'>
                    <Grid item>
                        <Grid container >
                            <Grid item>
                                <Star color={rentalDetail.rating > 4 ? 'secondary' : 'inherit'} />
                            </Grid>
                            <Grid item>
                                <Typography variant='h6' >
                                    {rentalDetail.rating ? ` ${parseFloat(rentalDetail.rating.toString()).toFixed(2)} (${rentalDetail.numberReviews} reviews)` : 'No Review (yet)'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <IconButton edge='end' onClick={onClose}><CancelOutlined /></IconButton>
                    </Grid>
                </Grid>
                <Divider />
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    {
                        reviews?.data.map(review => (
                            <Grid item xs={12} key={review._id}>
                                <ReviewItem review={review}/>
                            </Grid>
                        ))
                    }
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default ReviewDialog
