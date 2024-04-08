import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoggerService } from '@/services/logger/logger.service';
import { APPLICATION_ROUTES } from '@/app/app.routes';
import { JwtService } from '@/services/jwt/jwt.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private jwtService: JwtService,
        private router: Router,
        private loggerService: LoggerService
    ) {}

    /**
     *  Verifica si el usuario actual tiene un token valido, si el token es invalido lo redirecciona al login
     */
    hasValidToken(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        if (this.jwtService.isValidToken()) {
            return true;
        } else {
            this.loggerService.log('Token is not valid, redirecting to login...');
            this.jwtService.removeToken();
            this.router.navigate([APPLICATION_ROUTES.LOGIN]);
            return false;
        }
    }

    /**
     * Verifica si el usuario actual ya está autenticado, si está autenticado lo redirecciona al dashboard
     */
    isAlreadyAuthenticated(_next: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
        if (this.jwtService.isValidToken()) {
            this.loggerService.log('User is already authenticated, redirecting to dashboard...');
            this.router.navigate([APPLICATION_ROUTES.DASHBOARD]);
            return false;
        }

        return true;
    }
}

// Estos son los decoradores que se utilizarán para proteger las rutas, se utilizan dentro de `canActivate`
export const requiresAuthentication = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    inject(AuthGuard).hasValidToken(next, state);

export const redirectIfAuthenticated = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
    inject(AuthGuard).isAlreadyAuthenticated(next, state);
