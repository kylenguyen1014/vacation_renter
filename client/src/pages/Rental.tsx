import { ReactElement } from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import CreateARental from '../components/RentalPage/CreateARental/CreateARental'
import EditARental from '../components/RentalPage/EditARental/EditARental'
import RentalDetail from '../components/RentalPage/RentalDetail/RentalDetail'
import RentalList from '../components/RentalPage/RentalList/RentalList'
import { ROUTES } from '../routes/routes'



function Rental(): ReactElement {
    return (
        <div>
            <Switch>
                <ProtectedRoute path='/rentals/new' exact>
                    <CreateARental />
                </ProtectedRoute>
                <ProtectedRoute path={`${ROUTES._RENTAL}/:rentalId/edit`} >
                    <EditARental />
                </ProtectedRoute>
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
