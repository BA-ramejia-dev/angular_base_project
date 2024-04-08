import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { DashBoardSection } from '@/services/dashboard/dashboard.service.types';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    constructor(private httpClient: HttpClient) {}

    getDashboardSections(): Observable<DashBoardSection[]> {
        return this.httpClient.get<DashBoardSection[]>(`${environment.backendURL}/dashboard`);
    }
}
