import { AuthGuard } from './auth.guard';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtService } from '@/app/services/jwt/jwt.service';
import { LoggerService } from '@/app/services/logger/logger.service';
import { mockRouter } from '@/testing/mockServices';

jest.mock('@/app/services/jwt/jwt.service');

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let jwtService: JwtService;
    let router: Router;
    let logger: LoggerService;

    const routerSpy = mockRouter();

    beforeEach(() => {
        logger = new LoggerService();
        jwtService = new JwtService(logger);
        router = routerSpy as unknown as Router;
        guard = new AuthGuard(jwtService, router, logger);
    });

    it('should return true if token is valid', () => {
        jest.spyOn(jwtService, 'isValidToken').mockReturnValue(true);
        expect(guard.hasValidToken({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBe(
            true
        );
    });

    it('should redirect to login if token invalid', () => {
        jest.spyOn(jwtService, 'isValidToken').mockReturnValue(false);
        guard.hasValidToken({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
        expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
    });

    it('should return true if token is not valid', () => {
        jest.spyOn(jwtService, 'isValidToken').mockReturnValue(false);
        expect(
            guard.isAlreadyAuthenticated({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
        ).toBe(true);
    });

    it('should redirect to dashboard if user is already authenticated', () => {
        jest.spyOn(jwtService, 'isValidToken').mockReturnValue(true);
        expect(
            guard.isAlreadyAuthenticated({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
        ).toBe(false);
        expect(router.navigate).toHaveBeenCalledWith(['dashboard']);
    });
});
