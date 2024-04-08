export interface FindUserResponse {
    id: number;
    userName: string;
    name: string;
    email: string;
}

export interface AddUserToTeam {
    userId: number;
    teamId: number;
}
