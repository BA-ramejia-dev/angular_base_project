import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { APPLICATION_ROUTES } from '@/app/app.routes';
import { NgForOf, NgIf } from '@angular/common';
import { LoggerService } from '@/services/logger/logger.service';
import { DashBoardItem, DashBoardSection } from '@/services/dashboard/dashboard.service.types';
import { DashboardService } from '@/services/dashboard/dashboard.service';
import { JwtService } from '@/services/jwt/jwt.service';
import { UserStatus } from '@/services/jwt/jwt.service.types';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [NgForOf, NgIf],
    templateUrl: './DashboardComponent.html'
})
export class DashboardComponent implements OnInit {
    dashBoardSections: DashBoardSection[] = [];

    // Propiedades de salida
    @Output() loadFailure = new EventEmitter<HttpErrorResponse>();

    constructor(
        private router: Router,
        private dashBoardService: DashboardService,
        private jwtUtils: JwtService,
        private loggerService: LoggerService
    ) {}

    ngOnInit(): void {
        const tokenData = this.jwtUtils.getCurrentTokenData();
        const userStatus = tokenData?.userStatus || UserStatus.UNKNOWN;

        if (userStatus === UserStatus.ACTIVE) {
            this.handleActiveUser();
        } else if (userStatus == UserStatus.INACTIVE) {
            this.handleInactiveUser();
        } else if (userStatus === UserStatus.BLOCKED) {
            this.handleBlockedUser();
        }
    }

    handleActiveUser() {
        this.dashBoardService.getDashboardSections().subscribe({
            next: (response: DashBoardSection[]) => {
                this.dashBoardSections = response;
            },
            error: (httpError: HttpErrorResponse) => {
                this.loadFailure.emit(httpError);
            }
        });
    }

    handleInactiveUser() {
        this.loggerService.warning('User is inactive...');
    }

    handleBlockedUser() {
        this.loggerService.error('User is blocked...');
    }

    onItemClick(item: DashBoardItem) {
        this.router.navigate([APPLICATION_ROUTES.REQUESTS], {
            queryParams: {
                status: item.status
            }
        });
    }
}
