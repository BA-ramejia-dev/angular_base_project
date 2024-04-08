export enum TeamState {
    ACTIVE = 1,
    INACTIVE = 2
}

export interface Team {
    id: number;
    name: string;
    description: string;
    state: TeamState;
    leaderId: number;
    leaderName: string;
}

export type CreateTeam = Omit<Team, 'id' | 'leaderName'>;
export type EditTeam = Omit<Team, 'leaderName'>;
