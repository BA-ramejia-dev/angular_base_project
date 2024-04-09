import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { of, throwError } from 'rxjs';
import { AuthService } from '@/app/services/auth/auth.service';
import { LoginComponent } from '@/app/components/login/login.component';
import jwt from 'jsonwebtoken';
import { TokenData, UserStatus } from '@/app/services/jwt/jwt.service.types';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { AuthResponse } from '@/app/services/auth/auth.service.types';

describe('LoginComponent', () => {
    const tokenData: TokenData = {
        userId: 123,
        userName: 'Juan Perez',
        userStatus: UserStatus.ACTIVE
    };
    const dummyJWT = jwt.sign(tokenData, 'PRIVATE_KEY');

    const mockLoginSuccessResponse = {
        login: jest.fn().mockReturnValue(
            of({
                token: dummyJWT
            })
        )
    };

    const mockLoginFailureResponse = {
        login: jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })))
    };

    const fillOutLoginForm = async () => {
        const user = userEvent.setup();
        const usernameInput = screen.getByTestId('userName');
        const passwordInput = screen
            .getByTestId('password')
            .querySelector('input') as HTMLInputElement;
        await user.type(usernameInput, 'master');
        await user.type(passwordInput, 'master');
    };

    it('should render', async () => {
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginSuccessResponse
                }
            ],
            componentInputs: {
                applicationName: 'Test'
            }
        });

        // Check bancatlan logo exists
        const logo = screen.getByAltText('Bancatlan Logo');
        expect(logo).toBeInTheDocument();

        // Check that application name is correctly displayed
        const applicationName = screen.getByText('Test');
        expect(applicationName).toBeInTheDocument();

        // Check that there's a default text for a welcome message and security
        expect(screen.getByText('¡Bienvenido!')).toBeInTheDocument();
        expect(screen.getByText('Por favor ingresa tus credenciales')).toBeInTheDocument();

        // Check that username, password and submit button are displayed
        const usernameInput = screen.getByTestId('userName');
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId('password');
        expect(passwordInput).toBeInTheDocument();

        const submitButton = screen.getByText('Iniciar sesión');
        expect(submitButton).toBeInTheDocument();
    });

    it('should display an error message for every field when they are empty and user tries to submit', async () => {
        const user = userEvent.setup();
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginSuccessResponse
                }
            ]
        });

        // Submit the form
        const submitButton = screen.getByText('Iniciar sesión');
        await user.click(submitButton);

        // Check errors
        const errors = screen.getAllByText('Campo requerido');
        expect(errors.length).toEqual(2);
    });

    it('should display a minLength error message when only 1 character is entered and user blurs', async () => {
        const user = userEvent.setup();
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginSuccessResponse
                }
            ]
        });

        // Write only 1 character
        const usernameInput = screen.getByTestId('userName');
        await user.type(usernameInput, 'a');

        // Trigger a blur event
        fireEvent.blur(usernameInput);

        // Check error
        expect(screen.queryByText('La longitud minima es', { exact: false })).toBeInTheDocument();
    });

    it('should emit loginSuccess event on successful submit', async () => {
        const loginSuccessSpy = jest.fn();
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginSuccessResponse
                }
            ],
            componentOutputs: {
                loginSuccess: {
                    emit: loginSuccessSpy
                } as unknown as EventEmitter<AuthResponse>
            }
        });

        // Fill out form
        await fillOutLoginForm();

        // Submit form
        const submitButton = screen.getByText('Iniciar sesión');
        await userEvent.click(submitButton);

        // Make sure event is emitted
        expect(loginSuccessSpy).toHaveBeenCalledWith({
            token: dummyJWT
        });
    });

    it('should emit loginFailure event on failed submit', async () => {
        const loginFailureSpy = jest.fn();

        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginFailureResponse
                }
            ],
            componentOutputs: {
                loginFailure: {
                    emit: loginFailureSpy
                } as unknown as EventEmitter<HttpErrorResponse>
            }
        });

        // Fill out form
        await fillOutLoginForm();

        // Submit form
        const submitButton = screen.getByText('Iniciar sesión');
        await userEvent.click(submitButton);

        // Make sure event is emitted
        expect(loginFailureSpy).toHaveBeenCalledWith(expect.any(HttpErrorResponse));
    });
});
