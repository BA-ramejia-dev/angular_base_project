import { render, screen } from '@testing-library/angular';
import { AuthService } from '@/services/auth/auth.service';
import { of } from 'rxjs';
import { LoginPageComponent } from '@/pages/login/LoginPageComponent';
import userEvent from '@testing-library/user-event';
import { Router } from '@angular/router';
import { JwtService } from '@/services/jwt/jwt.service';
import { APPLICATION_ROUTES } from '@/app/app.routes';

describe('LoginPageComponent', () => {
    const sampleJWT = '1234';

    const mockSuccessResponse = {
        login: jest.fn().mockReturnValue(
            of({
                token: sampleJWT
            })
        )
    };

    const mockRouter = {
        navigate: jest.fn()
    };

    const mockJwtService = {
        setToken: jest.fn()
    };

    it('should navigate to dashboard on login success', async () => {
        const user = userEvent.setup();
        await render(LoginPageComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockSuccessResponse
                },
                { provide: Router, useValue: mockRouter },
                { provide: JwtService, useValue: mockJwtService }
            ]
        });

        // Fill out form
        const usernameInput = screen.getByTestId('userName');
        const passwordInput = screen
            .getByTestId('password')
            .querySelector('input') as HTMLInputElement;
        await user.type(usernameInput, 'master');
        await user.type(passwordInput, 'master');

        // Submit form
        const submitButton = screen.getByText('Iniciar sesión');
        await userEvent.click(submitButton);

        // Check that token is being set
        expect(mockJwtService.setToken).toHaveBeenCalledWith(sampleJWT);

        // Check that user is navigated to dashboard
        expect(mockRouter.navigate).toHaveBeenCalledWith([APPLICATION_ROUTES.DASHBOARD]);
    });
});
