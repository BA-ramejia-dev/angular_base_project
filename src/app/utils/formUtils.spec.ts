import { FormControl } from '@angular/forms';
import { ErrorTypes, shouldDisplayErrorMessage } from '@/app/utils/formUtils';

describe('formUtils', () => {
    it('should return false if control is valid', () => {
        const formControl = new FormControl();
        const result = shouldDisplayErrorMessage(formControl, true, ErrorTypes.REQUIRED_FIELD);
        expect(result).toBe(false);
    });

    it("should return false if errorType doesn't match", () => {
        const formControl = new FormControl();
        formControl.setErrors({ regex: 'Custom Error Message' });
        const result = shouldDisplayErrorMessage(formControl, true, ErrorTypes.REQUIRED_FIELD);
        expect(result).toBe(false);
    });

    it("should return true if form hasn't been submitted but control is dirty", () => {
        const formControl = new FormControl();
        formControl.setErrors({ [ErrorTypes.REQUIRED_FIELD]: 'Campo requerido' });
        formControl.markAsDirty();
        const result = shouldDisplayErrorMessage(formControl, false, ErrorTypes.REQUIRED_FIELD);
        expect(result).toBe(true);
    });

    it("should return true if form hasn't been submitted but control is touched", () => {
        const formControl = new FormControl();
        formControl.setErrors({ [ErrorTypes.REQUIRED_FIELD]: 'Campo requerido' });
        formControl.markAsTouched();
        const result = shouldDisplayErrorMessage(formControl, false, ErrorTypes.REQUIRED_FIELD);
        expect(result).toBe(true);
    });
});
