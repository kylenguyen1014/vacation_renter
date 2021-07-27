export const ROUTES = {
    _HOME : '/',
    _RENTAL : '/rentals',
    _RENTAL_DETAIL : (rentalId : string) => ROUTES._RENTAL + '/' + rentalId,
    _HOST_A_RENTAL :  'rentals/new'
}