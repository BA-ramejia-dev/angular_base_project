import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoggerService } from '@/app/services/logger/logger.service';
import { TokenData } from '@/app/services/jwt/jwt.service.types';

@Injectable({
    providedIn: 'root'
})
export class JwtService {
    // Esta es la llave que se utiliza como referencia para guardar el token en el localStorage
    TOKEN_KEY = 'APP_TOKEN';

    constructor(private loggerService: LoggerService) {}

    // Agrega el token al localStorage
    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    // Obtiene el token del localStorage
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    // Elimina el token del localStorage
    removeToken(): void {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    // Verifica si el token actual es válido, tanto en forma como en tiempo de expiración
    isValidToken(): boolean {
        const token = this.getToken();
        return !!token && !this.isTokenExpired();
    }

    // Verifica si el token actual está expirado
    private isTokenExpired(): boolean {
        const token = this.getToken();
        const decodedToken = this.decodeToken(token);

        if (decodedToken && decodedToken.exp) {
            const expirationDate = new Date(0);
            expirationDate.setUTCSeconds(decodedToken.exp);
            return expirationDate.valueOf() < new Date().valueOf();
        }

        return false;
    }

    // Intenta decodificar el token y devolver los datos
    decodeToken(token: string | null): TokenData | null {
        try {
            return token ? jwtDecode(token) : null;
        } catch (error) {
            this.loggerService.error(error);
            return null;
        }
    }

    // Obtiene los datos del usuario actual basado en el token
    getCurrentTokenData(): TokenData | null {
        const token = this.getToken();
        return this.decodeToken(token);
    }
}
