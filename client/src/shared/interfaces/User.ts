export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserAuthenticationResp {
    accessToken: string;
    user: User;
}