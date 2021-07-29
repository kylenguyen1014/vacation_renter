import { Typography } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { userQueryListRental } from '../../../react-query/useQueryRental'
import SkeletonLoading from '../../SkeletonLoading/SkeletonLoading'
import RentalItem from '../RentalItem/RentalItem'

function RentalList(): ReactElement {
    const { data : rentalListResp, isLoading } = userQueryListRental()

    if (isLoading) {
        return <SkeletonLoading />
    }
    if (!rentalListResp) {
        return <Typography variant='h3'>Failed to load data...</Typography>
    }
    return (
        <div>
            {
                rentalListResp.data.map(rental => <RentalItem key={rental._id} rental={rental}/>)
            }
        </div>
    )
}

export default RentalList
