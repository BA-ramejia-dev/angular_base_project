import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { CreateTeam, EditTeam, Team } from '@/app/services/teams/teams.service.types';
import { AddUserToTeam } from '@/app/services/users/users.service.types';

@Injectable({
    providedIn: 'root'
})
export class TeamsService {
    constructor(private httpClient: HttpClient) {}

    createTeam(payload: CreateTeam): Observable<Team> {
        return this.httpClient.post<Team>(`${environment.backendURL}/teams/add`, payload);
    }

    editTeam(payload: EditTeam): Observable<Team> {
        return this.httpClient.patch<Team>(`${environment.backendURL}/teams/edit`, payload);
    }

    getAllTeams(): Observable<Team[]> {
        return this.httpClient.get<Team[]>(`${environment.backendURL}/teams`);
    }

    addUserToTeam(payload: AddUserToTeam) {
        return this.httpClient.post(`${environment.backendURL}/team/addUser`, payload);
    }
}
