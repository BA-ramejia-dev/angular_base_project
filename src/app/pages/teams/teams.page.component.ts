import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PageSkeletonComponent } from '@/app/components/layout/page-skeleton/page-skeleton.component';
import { TeamsComponent } from '@/app/components/teams/teams.component';

@Component({
    selector: 'app-teams-page',
    templateUrl: './teams.page.component.html',
    standalone: true,
    imports: [ToastModule, PageSkeletonComponent, TeamsComponent],
    providers: [MessageService, DialogService]
})
export class TeamsPageComponent {}
