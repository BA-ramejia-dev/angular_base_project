import { Component } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

export interface ModalContent {
    content: string;
}

/**
 * Este componente debe ser utilizado cuando se necesita como cuerpo del modal un texto simple, puede ser útil para
 * mostrar mensajes de error, advertencias, confirmaciones, etc.
 */
@Component({
    selector: 'app-modal-body',
    standalone: true,
    templateUrl: './modal-body.component.html'
})
export class ModalBodyComponent {
    protected content: string | undefined = '';

    constructor(private dynamicDialogConfig: DynamicDialogConfig<ModalContent>) {
        if (this.dynamicDialogConfig.data) {
            this.content = dynamicDialogConfig.data?.content;
        }
    }
}
