import { fireEvent, render, screen } from '@testing-library/angular';
import { LoginComponent } from '@/components/login/LoginComponent';
import userEvent from '@testing-library/user-event';
import { AuthService } from '@/services/auth/auth.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
    const mockSuccessResponse = {
        login: jest.fn().mockReturnValue(
            of({
                token: 'dummy JWT'
            })
        )
    };

    const mockFailureResponse = {
        login: jest.fn().mockReturnValue(throwError(() => new Error('Internal Server Error')))
    };

    it('should render', async () => {
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockSuccessResponse
                }
            ]
        });

        const usernameInput = screen.getByTestId('userName');
        expect(usernameInput).toBeInTheDocument();

        const passwordInput = screen.getByTestId('password');
        expect(passwordInput).toBeInTheDocument();

        const submitButton = screen.getByText('Iniciar sesión');
        expect(submitButton).toBeInTheDocument();
    });

    it('should display error messages when fields are empty and user tries to submit', async () => {
        const user = userEvent.setup();
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockSuccessResponse
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
                    useValue: mockSuccessResponse
                }
            ]
        });

        // Type only 1 character
        const usernameInput = screen.getByTestId('userName');
        await user.type(usernameInput, 'a');

        // Trigger a blur event
        fireEvent.blur(usernameInput);

        // Check error
        expect(screen.queryByText('La longitud minima es', { exact: false })).toBeInTheDocument();
    });

    it('should emit loginSuccess event on successful submit', async () => {
        const user = userEvent.setup();
        const loginSuccessSpy = jest.fn();
        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockSuccessResponse
                }
            ],
            componentOutputs: {
                loginSuccess: {
                    emit: loginSuccessSpy
                } as any
            }
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

        // Make sure event is emitted
        expect(loginSuccessSpy).toHaveBeenCalledWith({
            token: expect.any(String)
        });
    });

    it('should emit loginFailure event on failed submit', async () => {
        const user = userEvent.setup();
        const loginFailureSpy = jest.fn();

        await render(LoginComponent, {
            componentProviders: [
                {
                    provide: AuthService,
                    useValue: mockFailureResponse
                }
            ],
            componentOutputs: {
                loginFailure: {
                    emit: loginFailureSpy
                } as any
            }
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

        // Make sure event is emitted
        expect(loginFailureSpy).toHaveBeenCalledWith(expect.any(Error));
    });
});
