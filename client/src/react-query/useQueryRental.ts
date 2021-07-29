import feathersClient from "../API/feathersClient";
import { AxiosError } from "axios";
import { QueryObserverResult, useQuery } from "react-query";
import { Rental, RentalListResp } from "../shared/interfaces/Rental";
import { QUERYKEYS } from './reactQueryKeys';
import { FeatherServices } from "../API/featherServices";

export const userQueryListRental = (): QueryObserverResult<RentalListResp | undefined> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<RentalListResp, AxiosError>(QUERYKEYS.RENTALS(), async () => {
        const resp: RentalListResp = await feathersClient.service(FeatherServices.rentals).find();
        return resp;
    })
}
export const userQueryDetailRental = (rentalId: string): QueryObserverResult<Rental | undefined> => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery<Rental, AxiosError>(QUERYKEYS.RENTAL_DETAIL(rentalId), async () => {
        const data: Rental = await feathersClient.service(FeatherServices.rentals).get(rentalId);
        return data;
    })
}