import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

/**
 * Este componente debe utilizarse cuando deseamos agregar en el "footer" del modal un solo botón para poder
 * cerrar el modal.
 */
@Component({
    selector: 'app-modal-footer',
    standalone: true,
    imports: [ButtonModule, RippleModule],
    templateUrl: './ModalFooterComponent.html'
})
export class ModalFooterComponent {
    constructor(private dialogRef: DynamicDialogRef) {}

    protected closeDialog() {
        this.dialogRef.close();
    }
}
