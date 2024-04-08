import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { PageSkeletonComponent } from '@/components/layout/page-skeleton/PageSkeletonComponent';
import { TeamsComponent } from '@/components/teams/TeamsComponent';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-teams-page',
    templateUrl: './TeamsPageComponent.html',
    standalone: true,
    imports: [ToastModule, PageSkeletonComponent, TeamsComponent],
    providers: [MessageService, DialogService]
})
export class TeamsPageComponent {}
