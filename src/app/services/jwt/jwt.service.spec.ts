import { JwtService } from './jwt.service';
import { LoggerService } from '@/app/services/logger/logger.service';
import { TokenData, UserStatus } from '@/app/services/jwt/jwt.service.types';
import jwt from 'jsonwebtoken';

describe('JwtService', () => {
    let service: JwtService;
    let logger: LoggerService;

    const tokenData: TokenData = {
        userId: 123,
        userName: 'Juan Perez',
        userStatus: UserStatus.ACTIVE
    };
    const dummyJWT = jwt.sign(tokenData, 'PRIVATE_KEY');

    beforeEach(() => {
        logger = new LoggerService();
        service = new JwtService(logger);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should set and get token from localStorage', () => {
        service.setToken(dummyJWT);
        expect(service.getToken()).toBe(dummyJWT);
    });

    it('should remove token from localStorage', () => {
        service.setToken(dummyJWT);

        // Token exists
        expect(service.getToken()).toBe(dummyJWT);

        // Remove token
        service.removeToken();
        expect(service.getToken()).toBe(null);
    });

    it('should true if token is valid', () => {
        service.setToken(dummyJWT);
        expect(service.isValidToken()).toBe(true);
    });

    it('should return false if token is expired', () => {
        const jwtWithExpiration = jwt.sign(tokenData, 'PRIVATE_KEY', { expiresIn: '0s' });
        service.setToken(jwtWithExpiration);
        expect(service.isValidToken()).toBe(false);
    });

    it('should decode token', () => {
        const result = service.decodeToken(dummyJWT);
        expect(result).toEqual(expect.objectContaining(tokenData));
    });

    it('should not decode token if value is malformed', () => {
        const result = service.decodeToken('ABC');
        expect(result).toEqual(null);
    });

    it('should get decoded tokenData from localStorage', () => {
        service.setToken(dummyJWT);
        const result = service.getCurrentTokenData();
        expect(result).toEqual(expect.objectContaining(tokenData));
    });
});
