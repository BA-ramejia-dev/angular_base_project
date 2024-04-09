import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { JwtService } from '@/app/services/jwt/jwt.service';
import { SharedFormService } from '@/app/services/shared-form.service';
import { LoggerService } from '@/app/services/logger/logger.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private jwtService: JwtService,
        private sharedFormService: SharedFormService,
        private loggerService: LoggerService
    ) {}

    /**
     * Este interceptor es disparado cada vez que se realiza una petición HTTP, esto tiene varios usos: agregar el token
     * a cualquier petición que enviamos al backend, mostrar logs sobre el estado actual de una petición o incluso
     * bloquear por completo una petición.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        const requestURL = this.cleanUrlDomain(request.urlWithParams);

        // Si hay un token, lo agregamos a la petición actual
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });

            this.loggerService.log(`JWT authorization header added to URL: ${requestURL}`);
        }

        // Informar al servicio compartido de formularios que se está ejecutando una solicitud HTTP
        this.sharedFormService.setIsHttpRequestRunning(true);
        this.loggerService.log(`HTTP request started to URL: ${requestURL}`);

        return next.handle(request).pipe(
            // Realizar una acción después de que se complete la solicitud (exitosamente o con error)
            finalize(() => {
                // Informar al servicio compartido de formularios que ha finalizado una petición HTTP
                this.loggerService.log(`HTTP request completed from URL: ${requestURL}`);
                this.sharedFormService.setIsHttpRequestRunning(false);
            })
        );
    }

    cleanUrlDomain(url: string) {
        const urlParts = new URL(url);
        return urlParts.pathname + urlParts.searchParams;
    }
}
