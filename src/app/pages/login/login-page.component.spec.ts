import { render } from '@testing-library/angular';
import { LoginPageComponent } from '@/app/pages/login/login-page.component';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '@/app/app.routes';
import { AuthService } from '@/app/services/auth/auth.service';
import { JwtService } from '@/app/services/jwt/jwt.service';
import { DialogService } from 'primeng/dynamicdialog';
import { Type } from '@angular/core';
import {
    mockDialogOpen,
    mockJwtService,
    mockLoginFailureResponse,
    mockLoginSuccessResponse,
    mockRouter
} from '@/testing/mockServices';
import { fillAndSubmitLoginForm } from '@/testing/testingUtils';

describe('LoginPageComponent', () => {
    it('should navigate to dashboard on login success', async () => {
        const jwtServiceSpy = mockJwtService();
        const routerSpy = mockRouter();
        await render(LoginPageComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginSuccessResponse()
                },
                { provide: Router, useValue: routerSpy },
                { provide: JwtService, useValue: jwtServiceSpy }
            ]
        });

        // Submit form
        await fillAndSubmitLoginForm();

        // Check that token is being set
        expect(jwtServiceSpy.setToken).toHaveBeenCalledWith(expect.any(String));

        // Check that user is navigated to dashboard
        expect(routerSpy.navigate).toHaveBeenCalledWith([APPLICATION_ROUTES.DASHBOARD]);
    });

    it('should display error dialog on login failure', async () => {
        const dialogSpy = mockDialogOpen();
        await render(LoginPageComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginFailureResponse()
                },
                {
                    provide: DialogService,
                    useValue: dialogSpy
                },
                { provide: Router, useValue: mockRouter },
                { provide: JwtService, useValue: mockJwtService }
            ]
        });

        // Submit form
        await fillAndSubmitLoginForm();

        // Check dialog is open and check error message
        expect(dialogSpy.open).toHaveBeenCalledWith(
            expect.any(Type),
            expect.objectContaining({
                header: 'Error desconocido',
                data: expect.objectContaining({
                    content: 'Errores desconocidos. Inténtalo de nuevo más tarde.'
                })
            })
        );
    });
});
