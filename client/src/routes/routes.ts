export const ROUTES = {
    _HOME : '/',
    _RENTAL : '/rentals',
    _RENTAL_DETAIL : (rentalId : string) => ROUTES._RENTAL + '/' + rentalId,
    _RENTAL_DETAIL_EDIT : (rentalId : string) => ROUTES._RENTAL_DETAIL(rentalId) + '/edit',
    _HOST_A_RENTAL :  '/rentals/new'
}