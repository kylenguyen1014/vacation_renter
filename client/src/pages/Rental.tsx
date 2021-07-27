import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateARental from '../components/RentalPage/CreateARental/CreateARental'
import EditARental from '../components/RentalPage/EditARental/EditARental'
import { ROUTES } from '../routes/routes'



function Rental(): ReactElement {
    return (
        <div>
            <Switch>
                <Route path='/rentals/new' exact>
                    <CreateARental />
                </Route>
                <Route path={`${ROUTES._RENTAL}/:rentalId/edit`} >
                    <EditARental />
                </Route>
                <Route path={`${ROUTES._RENTAL}/:rentalId`}>
                    Detail
                </Route>
            </Switch>
        </div>
    )
}

export default Rental
