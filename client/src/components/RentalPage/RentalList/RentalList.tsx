import { Container, Grid, Typography } from '@material-ui/core'
import React, { ReactElement, useState } from 'react'
import { userQueryListRental } from '../../../react-query/useQueryRental'
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading'
import RentalItem from '../RentalItem/RentalItem'
import ReactMapGL, { Marker, Popup, ViewportProps } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_TOKEN } from '../../../shared/constants/MapBox'
import { Pagination } from '@material-ui/lab'
import { RentalPaginationSize } from '../../../react-query/useQueryRental'
import { Rental } from '../../../shared/interfaces/Rental'
import { useHistory } from 'react-router-dom'
import { ROUTES } from '../../../routes/routes'
import empty from '../../../images/empty.png'

interface MapViewPort {
    longitude: number | undefined;
    latitude: number | undefined;
    zoom: number | undefined;
}

function RentalList(): ReactElement {
    const history = useHistory()
    const [page, setPage] = useState<number>(1)
    const [showLocationPopUp, setShowLocationPopUp] = useState<boolean>(false)
    const [selectedRental, setSelectedRental] = useState<Rental | undefined>(undefined)
    const [hoverRental, setHoverRental] = useState<Rental | undefined>(undefined)

    const { data: rentalListResp, isLoading } = userQueryListRental(page)
    const [viewPort, setViewPort] = useState<MapViewPort>({ longitude: -75.17, latitude: 39.98, zoom: 3.75 })

    const handleMapMove = (data: ViewportProps) => {
        console.log(data)
        setViewPort({
            latitude: data.latitude,
            longitude: data.longitude,
            zoom: data.zoom
        })
    }

    const handleClickMarker = (marker: Rental) => {
        setSelectedRental(marker)
        setShowLocationPopUp(true)
    }

    const closePopUp = () => {
        setShowLocationPopUp(false)
        setSelectedRental(undefined)
    }

    const handleHoverOnRental = (rental: Rental | undefined) => {
        setHoverRental(rental)
    }

    const handlePageChange = (e: any, page: number) => {
        setPage(page)
    }

    if (isLoading) {
        return <SkeletonLoading />
    }
    if (!rentalListResp) {
        return <Typography variant='h3'>Failed to load data...</Typography>
    }
    return (
        <div className='RentalList-root'>
            <Container maxWidth='xl' disableGutters >
                <Grid container spacing={1}>
                    <Grid item lg={6} md={12}>
                        <div className='RentalList-container'>
                            <Typography variant='h5'>All Rentals</Typography>
                            <Grid container justifyContent='center'>
                                <Grid item>
                                    <Pagination count={Math.ceil(rentalListResp.total / RentalPaginationSize)} page={page} onChange={handlePageChange} />

                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                {
                                    rentalListResp.data.map(rental => (
                                        <Grid item xs={12} key={rental._id} >
                                            <RentalItem key={rental._id} rental={rental} handleHoverOnRental={handleHoverOnRental} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item lg={6} md={false} >
                        <div style={{ position: 'fixed', width: '100%' }}>
                            <ReactMapGL
                                width='100%'
                                // height='100%'
                                height='90vh'
                                {...viewPort}
                                mapboxApiAccessToken={MAPBOX_TOKEN}
                                onViewportChange={handleMapMove}
                                mapStyle='mapbox://styles/mapbox/streets-v11'
                                onClick={closePopUp}
                            >
                                {
                                    rentalListResp.data.map(rental => (
                                        <Marker key={rental._id} latitude={rental.geometry.coordinates[1]} longitude={rental.geometry.coordinates[0]} offsetLeft={-20} offsetTop={-10} >
                                            <span onClick={() => handleClickMarker(rental)} className={(hoverRental && hoverRental._id === rental._id) ? 'Rental-marker active' : 'Rental-marker'}>
                                                ${`${rental.price}`}
                                            </span>
                                        </Marker>
                                    ))
                                }
                                {
                                    showLocationPopUp && selectedRental &&
                                    <Popup
                                        latitude={selectedRental.geometry.coordinates[1]}
                                        longitude={selectedRental.geometry.coordinates[0]}
                                        closeButton={false} closeOnClick={false} onClose={closePopUp}
                                    >
                                        <div className='PopUp-container' onClick={() => history.push(ROUTES._RENTAL_DETAIL(selectedRental._id))}>
                                            <Grid container direction='column'>
                                                <Grid item>
                                                    <img src={selectedRental.images.length > 0 ? selectedRental.images[0].url : empty} alt='' className='PopUp-image' />
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='body1' noWrap className='PopUp-rental-name'>{selectedRental.name}</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant='subtitle2' >
                                                        ${selectedRental.price}
                                                        <Typography variant='caption'> / night</Typography>
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Popup>
                                }
                            </ReactMapGL>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default RentalList
