import React, { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import CreateARental from '../components/RentalPage/CreateARental/CreateARental'
import EditARental from '../components/RentalPage/EditARental/EditARental'
import RentalDetail from '../components/RentalPage/RentalDetail/RentalDetail'
import RentalList from '../components/RentalPage/RentalList/RentalList'
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
                    <RentalDetail />
                </Route>
                <Route path=''>
                    <RentalList />
                </Route>
            </Switch>
        </div>
    )
}

export default Rental
