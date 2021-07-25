export const ROUTES = {
    _HOME : '/',
    _RENTAL : '/rental',
    _RENTAL_DETAIL : (rentalId : string) => ROUTES._RENTAL + '/' + rentalId,
    
}