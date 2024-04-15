import { TokenData, UserStatus } from '@/app/services/jwt/jwt.service.types';
import jwt from 'jsonwebtoken';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/angular';

export const buildTokenData = (): TokenData => {
    return {
        userId: 123,
        userName: 'Juan Perez',
        userStatus: UserStatus.ACTIVE
    };
};

export const getDummyJWT = () => {
    const tokenData = buildTokenData();
    return jwt.sign(tokenData, 'PRIVATE_KEY');
};

export const fillAndSubmitLoginForm = async () => {
    const user = userEvent.setup();
    const usernameInput = screen.getByTestId<HTMLInputElement>('userName');
    const passwordInput = screen.getByTestId('password').querySelector('input') as HTMLInputElement;

    // Type credentials
    await user.type(usernameInput, 'dummy');
    await user.type(passwordInput, 'dummy');

    // Submit form
    await submitLoginForm();
};

export const submitLoginForm = async () => {
    const user = userEvent.setup();
    const submitButton = screen.getByText('Iniciar sesión');
    await user.click(submitButton);
};
