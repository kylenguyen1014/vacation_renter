export const QUERYKEYS = {
    USERS: () => 'users',
    USER_DETAIL: (userId: string) => ['user', { userId }],
    RENTALS: () => 'rentals',
    RENTALS_PAGING: (page: number, limit: number) => [QUERYKEYS.RENTALS, { page, limit}],
    RENTAL_DETAIL: (rentalId: string) => ['rental', { rentalId }],
    REVIEWS: () => 'reviews',
    REVIEW_DETAIL: (reviewId: string) => ['review', { reviewId }],
    REVIEWS_BY_RENTAL: (rentalId: string, limit? : number) => [QUERYKEYS.REVIEWS(), { rentalId, limit }]
}