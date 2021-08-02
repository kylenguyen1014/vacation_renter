import feathersClient from "../API/feathersClient";
import { AxiosError } from "axios";
import { QueryObserverResult, useQuery } from "react-query";
import { QUERYKEYS } from './reactQueryKeys';
import { FeatherServices } from "../API/featherServices";
import { Review, ReviewResp } from "../shared/interfaces/Review";


export const useQueryListReviewsByRental = (rentalId : string, numberReviews? : number): QueryObserverResult<ReviewResp | undefined> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<ReviewResp, AxiosError>(QUERYKEYS.REVIEWS_BY_RENTAL(rentalId, numberReviews), async () => {
        const resp: ReviewResp = await feathersClient.service(FeatherServices.reviews).find({ query: { rental : rentalId, $limit : numberReviews ? numberReviews : 6}});
        return resp;
    })
}
export const useQueryDetailReview = (reviewId: string): QueryObserverResult<Review | undefined> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Review, AxiosError>(QUERYKEYS.REVIEW_DETAIL(reviewId), async () => {
        const data: Review = await feathersClient.service(FeatherServices.reviews).get(reviewId);
        return data;
    })
}