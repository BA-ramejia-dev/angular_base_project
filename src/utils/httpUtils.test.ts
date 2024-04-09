import { HttpErrorResponse } from '@angular/common/http';
import { parseErrorResponse } from '@/utils/httpUtils';

describe('httpUtils', () => {
    it('should return connection error for 0 status', () => {
        const error = new HttpErrorResponse({ status: 0 });
        const result = parseErrorResponse(error);

        expect(result).toEqual({
            header: 'Error de conexión',
            body: 'No se pudo establecer conexión con el servidor'
        });
    });

    it('should return unauthorized for 401 status', () => {
        const error = new HttpErrorResponse({ status: 401 });
        const result = parseErrorResponse(error);

        expect(result).toEqual({
            header: 'Acceso no autorizado',
            body: 'Acceso no autorizado. Revisa tus credenciales.'
        });
    });

    it('should return default error for unknown status', () => {
        const error = new HttpErrorResponse({ status: 90000 });
        const result = parseErrorResponse(error);

        expect(result).toEqual({
            header: 'Error desconocido',
            body: 'Errores desconocidos. Inténtalo de nuevo más tarde.'
        });
    });
});
