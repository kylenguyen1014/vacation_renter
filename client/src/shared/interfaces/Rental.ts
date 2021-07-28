import { Geometry } from "./GeoCoding";
import { User } from "./User";

export interface RentalImage {
    url : string;
    fileName: string;
}

export interface RentalSpec {
    bed:number;
    bath:number;
}

export interface Rental {
    name: string;
    images: RentalImage[];
    geometry: Geometry;
    address : string;
    price : number;
    spec: RentalSpec;
    description: string;
    user?: User;
    createdAt : string;
    updatedAt : string;
}