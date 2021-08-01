import { FeatherPagination } from "./FeatherPagination";
import { UserShort } from "./User";

export interface Review {
    _id: string;
    text: string;
    rating: number;
    user: UserShort;
    rental: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReviewResp extends FeatherPagination {
    data : Review[]
}