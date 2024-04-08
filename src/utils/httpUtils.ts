import { HttpErrorResponse } from '@angular/common/http';

interface ErrorMap {
    [key: string]: RequestError;
}

interface RequestError {
    body: string;
    header: string;
}

/*
 * Toma una respuesta de error HTTP y proporciona un mensaje de error personalizado basado en el estado de la petición,
 * esto es útil para mostrar mensajes de error amigables al usuario final.
 */
export function parseErrorResponse(error: HttpErrorResponse): RequestError {
    const map: ErrorMap = {
        '0': {
            header: 'Error de conexión',
            body: 'No se pudo establecer conexión con el servidor'
        },
        '401': {
            header: 'Acceso no autorizado',
            body: 'Acceso no autorizado. Revisa tus credenciales.'
        },
        default: {
            header: 'Error desconocido',
            body: 'Errores desconocidos. Inténtalo de nuevo más tarde.'
        }
    };

    return map[error.status.toString()] || map['default'];
}
