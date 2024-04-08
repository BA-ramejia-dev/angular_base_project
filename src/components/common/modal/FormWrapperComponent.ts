import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SharedFormService } from '@/services/shared-form.service';

/**
 * Todos los componentes que sean utilizados dentro de un Modal, deben heredar de esta clase; la idea es proveer toda la
 * lógica relacionada con el envío del formulario.
 */
@Component({
    template: ``,
    standalone: true
})
export abstract class FormWrapperComponent implements OnInit, OnDestroy {
    ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

    protected constructor(protected sharedFormService: SharedFormService) {}

    ngOnInit() {
        this.sharedFormService.submitFormObservable$
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((shouldSubmit) => {
                if (shouldSubmit) {
                    this.handleOnFormSubmit();
                }
            });
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next(false);
        this.ngUnsubscribe.complete();
    }

    // Las subclases deben proveer una implementación para este método
    abstract handleOnFormSubmit(): void;
}
