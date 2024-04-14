import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { AuthService } from '@/app/services/auth/auth.service';
import { LoginComponent } from '@/app/components/login/login.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
import { AuthResponse } from '@/app/services/auth/auth.service.types';
import { mockLoginFailureResponse, mockLoginSuccessResponse } from '@/testing/mockServices';
import { fillAndSubmitLoginForm, submitLoginForm } from '@/testing/testingUtils';

describe('LoginComponent', () => {
    it('should render', async () => {
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginSuccessResponse()
                }
            ],
            componentInputs: {
                applicationName: 'Test'
            }
        });

        // Check that bancatlan logo exists
        const logo = screen.getByAltText('Bancatlan Logo');
        expect(logo).toBeInTheDocument();

        // Check that application name is correctly displayed
        const applicationName = screen.getByText('Test');
        expect(applicationName).toBeInTheDocument();

        // Check that there's a default text for a welcome message and security
        expect(screen.getByText('¡Bienvenido!')).toBeInTheDocument();
        expect(screen.getByText('Por favor ingresa tus credenciales')).toBeInTheDocument();

        // Check that username, password and submit button are displayed
        expect(screen.getByTestId('userName')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    });

    it('should display an error message for every field when they are empty and user tries to submit', async () => {
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginSuccessResponse()
                }
            ]
        });

        // Submit the form
        await submitLoginForm();

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
                    useValue: mockLoginSuccessResponse()
                }
            ]
        });

        // Write only 1 character
        const usernameInput = screen.getByTestId<HTMLInputElement>('userName');
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
                    useValue: mockLoginSuccessResponse()
                }
            ],
            componentOutputs: {
                loginSuccess: {
                    emit: loginSuccessSpy
                } as unknown as EventEmitter<AuthResponse>
            }
        });

        // Fill out form
        await fillAndSubmitLoginForm();

        // Make sure event is emitted
        expect(loginSuccessSpy).toHaveBeenCalledWith({
            token: expect.any(String)
        });
    });

    it('should emit loginFailure event on failed submit', async () => {
        const loginFailureSpy = jest.fn();

        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockLoginFailureResponse()
                }
            ],
            componentOutputs: {
                loginFailure: {
                    emit: loginFailureSpy
                } as unknown as EventEmitter<HttpErrorResponse>
            }
        });

        // Fill out form
        await fillAndSubmitLoginForm();

        // Make sure event is emitted
        expect(loginFailureSpy).toHaveBeenCalledWith(expect.any(HttpErrorResponse));
    });
});
