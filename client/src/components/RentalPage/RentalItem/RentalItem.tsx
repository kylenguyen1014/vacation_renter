import { Container, Divider, Grid, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Rental } from '../../../shared/interfaces/Rental'
import './RentalItem.scss';
import empty from '../../../images/empty.png';
import { useHistory } from 'react-router-dom';
import { ROUTES } from '../../../routes/routes';
import { Star } from '@material-ui/icons';

interface Props {
    rental: Rental;
    handleHoverOnRental: (rental : Rental | undefined) => void;
}

function RentalItem({ rental, handleHoverOnRental }: Props): ReactElement {
    const history = useHistory()

    const handleGoToDetail = () => {
        history.push(ROUTES._RENTAL_DETAIL(rental._id))
    }

    const mouseOver = () => {
        handleHoverOnRental(rental)
    }
    
    const mouseLeave = () => {
        handleHoverOnRental(undefined)
    }
    
    return (
        <div onClick={handleGoToDetail} className='RentalItem-root' onMouseOver={mouseOver} onMouseLeave={mouseLeave}>
            <Container disableGutters >
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={5} lg={4}>
                        <div className='RentalItem-main-image'>
                            {
                                rental.images.length === 0
                                    ? <img src={empty} alt='empty' />
                                    : <img src={rental.images[0].url} alt={rental.images[0].fileName} />
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={7} lg={8}>
                        <Grid container spacing={0} direction='column' justifyContent='space-between' style={{ height: '100%' }}>
                            <Grid item>
                                <Grid container wrap='nowrap' direction='column'>
                                    <Grid item >
                                        <Typography variant='body1' className='RentalItem-name' >{rental.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='caption' color='textSecondary'>{rental.address}</Typography>
                                        <Grid item >
                                            <Typography color='textSecondary' variant='caption'>
                                                {rental.spec.bed} bed{rental.spec.bed > 1 ? 's' : ''} ⋅ {rental.spec.bath} bath{rental.spec.bath > 1 ? 's' : ''}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Divider style={{ width: '20%' }} />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container justifyContent='space-between' alignItems='center'>
                                    <Grid item>
                                        <div >
                                            <Grid container spacing={0} alignItems='center' className='RentalDetail-rating'>
                                                <Grid item>
                                                    <Star color={rental.rating > 4 ? 'secondary' : 'inherit'} fontSize='small' />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='subtitle2' >
                                                        {rental.rating ? ` ${parseFloat(rental.rating.toString()).toFixed(2)} (${rental.numberReviews} reviews)` : 'No Review (yet)'}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant='body2' display='inline'>
                                            ${rental.price}
                                            <Typography display='inline' variant='caption'> / night</Typography>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

export default RentalItem
