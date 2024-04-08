import { JwtPayload } from 'jwt-decode';

export enum UserStatus {
    ACTIVE = 1,
    INACTIVE = 2,
    BLOCKED = 3,
    UNKNOWN = 5
}

export interface TokenData extends JwtPayload {
    userId: number;
    userName: string;
    userStatus: UserStatus;
}
