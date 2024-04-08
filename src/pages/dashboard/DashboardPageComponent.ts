import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpErrorResponse } from '@angular/common/http';
import { parseErrorResponse } from '@/utils/httpUtils';
import {
    ModalBodyComponent,
    ModalContent
} from '@/components/common/modal/modal-body/ModalBodyComponent';
import { DIALOG_COMMON_CONFIG } from '@/utils/messagesUtils';
import { PageSkeletonComponent } from '@/components/layout/page-skeleton/PageSkeletonComponent';
import { DashboardComponent } from '@/components/dashboard/DashboardComponent';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './DashboardPageComponent.html',
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
