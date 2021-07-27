import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import NewOrEditRentalForm from '../NewOrEditRental/NewOrEditRentalForm'

function EditARental(): ReactElement {
    const { rentalId } = useParams<{rentalId: string}>()
    return (
        <div>
            <NewOrEditRentalForm isEditting={true} rentalId={rentalId}/>
        </div>
    )
}

export default EditARental
