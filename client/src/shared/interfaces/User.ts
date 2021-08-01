import { FeatherPagination } from "./FeatherPagination";

export interface UserShort {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}
export interface UserFull extends UserShort {
    createdAt: string;
    updatedAt: string;
}

export interface UserAuthenticationResp {
    accessToken: string;
    user: UserFull;
}

export interface UserListResp extends FeatherPagination {
    data: UserFull[];
}