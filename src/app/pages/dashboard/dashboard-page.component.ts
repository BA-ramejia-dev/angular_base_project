import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { parseErrorResponse } from '@/app/utils/httpUtils';
import {
    ModalBodyComponent,
    ModalContent
} from '@/app/components/common/modal/modal-body/modal-body.component';
import { DIALOG_COMMON_CONFIG } from '@/app/utils/messagesUtils';
import { PageSkeletonComponent } from '@/app/components/layout/page-skeleton/page-skeleton.component';
import { DashboardComponent } from '@/app/components/dashboard/dashboard.component';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    standalone: true,
    imports: [ToastModule, PageSkeletonComponent, DashboardComponent],
    providers: [DialogService, MessageService]
})
export class DashboardPageComponent {
    constructor(private dialogService: DialogService) {}

    onLoadFailure(errorResponse: HttpErrorResponse): void {
        const { body, header } = parseErrorResponse(errorResponse);
        this.openDialog(body, header);
    }

    openDialog(content: string, header: string): void {
        const modalContent: ModalContent = { content };
        this.dialogService.open(ModalBodyComponent, {
            ...DIALOG_COMMON_CONFIG,
            header,
            data: modalContent
        });
    }
}
