export const QUERYKEYS = {
    USERS: () => 'users',
    USER_DETAIL: (userId: string) => ['user', { userId }],
    RENTALS: () => 'rentals',
    RENTAL_DETAIL: (rentalId: string) => ['rental', { rentalId }],
    REVIEWS: () => 'reviews',
    REVIEW_DETAIL: (reviewId: string) => ['review', { reviewId }]
}