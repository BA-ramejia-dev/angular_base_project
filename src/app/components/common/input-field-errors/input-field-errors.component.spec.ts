import { render, screen } from '@testing-library/angular';
import { InputFieldErrorsComponent } from '@/app/components/common/input-field-errors/input-field-errors.component';
import { FormControl } from '@angular/forms';
import { ErrorTypes } from '@/app/utils/formUtils';

describe('InputFieldErrors', () => {
    it('should render required error', async () => {
        const formControl = new FormControl();
        formControl.setErrors({ [ErrorTypes.REQUIRED_FIELD]: 'Required field' });
        await render(InputFieldErrorsComponent, {
            componentInputs: {
                currentInput: formControl,
                formHasBeenSubmitted: true
            }
        });

        expect(screen.getByText('Campo requerido')).toBeInTheDocument();
    });

    it('should render minLength error', async () => {
        const minLength = 2;
        const formControl = new FormControl();
        formControl.setErrors({ [ErrorTypes.MIN_LENGTH]: { requiredLength: minLength } });
        await render(InputFieldErrorsComponent, {
            componentInputs: {
                currentInput: formControl,
                formHasBeenSubmitted: true
            }
        });

        expect(
            screen.getByText(`La longitud minima es ${minLength} caracteres`)
        ).toBeInTheDocument();
    });
});
