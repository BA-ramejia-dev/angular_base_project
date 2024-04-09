import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { SharedFormService } from '@/app/services/shared-form.service';

/**
 * Este componente debe utilizarse cuando deseamos agregar en el "footer" del modal un botón para poder cerrar el modal
 * y un botón para guardar los datos del formulario asociado al modal.
 */
@Component({
    selector: 'app-modal-enhanced-footer',
    standalone: true,
    imports: [ButtonModule, RippleModule],
    templateUrl: './modal-enhanced-footer.component.html'
})
export class ModalEnhancedFooterComponent implements OnInit {
    protected isLoading: boolean = false;

    constructor(
        private dialogRef: DynamicDialogRef,
        private sharedFormService: SharedFormService
    ) {}

    ngOnInit() {
        this.sharedFormService.httpRequestObservable$.subscribe((isLoading) => {
            this.isLoading = isLoading;
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }

    saveData() {
        // Force the form submission
        this.sharedFormService.triggerFormSubmit();

        // This will prevent duplicate form submission
        this.sharedFormService.resetShouldSubmit();
    }
}
