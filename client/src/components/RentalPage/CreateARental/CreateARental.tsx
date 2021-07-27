import React, { ReactElement } from 'react'
import NewOrEditRentalForm from '../NewOrEditRental/NewOrEditRentalForm'

function CreateARental(): ReactElement {
    return (
        <div>
            <NewOrEditRentalForm isEditting={false}/>
        </div>
    )
}

export default CreateARental
