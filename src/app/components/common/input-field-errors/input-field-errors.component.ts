import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { shouldDisplayErrorMessage, ErrorTypes } from '@/app/utils/formUtils';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-input-field-errors',
    standalone: true,
    imports: [NgIf],
    templateUrl: './input-field-errors.component.html'
})
export class InputFieldErrorsComponent {
    protected readonly ErrorTypes = ErrorTypes;

    @Input({ required: true })
    currentInput!: FormControl;

    @Input({ required: true })
    formHasBeenSubmitted: boolean = false;

    protected shouldRenderError(errorType: ErrorTypes): boolean {
        return shouldDisplayErrorMessage(this.currentInput, this.formHasBeenSubmitted, errorType);
    }
}
