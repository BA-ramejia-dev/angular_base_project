import { FormControl } from '@angular/forms';

export enum ErrorTypes {
    REQUIRED_FIELD = 'required',
    MIN_LENGTH = 'minlength'
}

// La idea de esta función es mostrar un mensaje de error solo cuando el usuario ya ha interactuado con un campo.
export function shouldDisplayErrorMessage(
    formControl: FormControl,
    formHasBeenSubmitted: boolean,
    errorType: ErrorTypes
): boolean {
    return !!(
        formControl.invalid &&
        formControl.errors?.[errorType] &&
        (formHasBeenSubmitted || formControl.dirty || formControl.touched)
    );
}

/*
 * Esto es útil cuando queremos definir una interfaz que represente todos los elementos disponibles dentro de un
 * formulario, pero no queremos envolverlos directamente con un `FormControl` porque la misma interfaz se puede usar
 * para payloads de un servicio o para el modo edición.
 */
export type FormControls<T> = {
    [K in keyof T]: FormControl<T[K] | null>;
};
