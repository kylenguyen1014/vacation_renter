import React, { ReactElement } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { userQueryDetailRental } from '../../../react-query/useQueryRental';
import { useParams } from 'react-router-dom';

function RentalDetail(): ReactElement {
    const { rentalId } = useParams<{rentalId : string}>()
    const { data : rentalDetail } = userQueryDetailRental(rentalId)
    return (
        <div>
            
        </div>
    )
}

export default RentalDetail
