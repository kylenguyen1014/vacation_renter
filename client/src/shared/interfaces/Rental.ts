import { FeatherPagination } from "./FeatherPagination";
import { Geometry } from "./GeoCoding";
import { User } from "./User";

export interface RentalImage {
    url: string;
    fileName: string;
}

export interface RentalSpec {
    bed: number;
    bath: number;
}

export interface Rental {
    _id: string;
    name: string;
    images: RentalImage[];
    geometry: Geometry;
    address: string;
    price: number;
    spec: RentalSpec;
    description: string;
    user?: User;
    createdAt: string;
    updatedAt: string;
    rating : number | string;
    numberReviews : number;
}

export interface RentalListResp extends FeatherPagination {
    data : Rental[]
}