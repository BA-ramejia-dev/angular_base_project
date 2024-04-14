import { JwtService } from './jwt.service';
import { LoggerService } from '@/app/services/logger/logger.service';
import jwt from 'jsonwebtoken';
import { buildTokenData, getDummyJWT } from '@/testing/testingUtils';

describe('JwtService', () => {
    const dummyJWT = getDummyJWT();
    let service: JwtService;
    let logger: LoggerService;

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
        const jwtWithExpiration = jwt.sign({}, 'PRIVATE_KEY', { expiresIn: '0s' });
        service.setToken(jwtWithExpiration);
        expect(service.isValidToken()).toBe(false);
    });

    it('should decode token', () => {
        const tokenData = buildTokenData();
        const result = service.decodeToken(dummyJWT);
        expect(result).toEqual(expect.objectContaining(tokenData));
    });

    it('should not decode token if value is malformed', () => {
        const result = service.decodeToken('ABC');
        expect(result).toEqual(null);
    });

    it('should get decoded tokenData from localStorage', () => {
        const tokenData = buildTokenData();
        service.setToken(dummyJWT);
        const result = service.getCurrentTokenData();
        expect(result).toEqual(expect.objectContaining(tokenData));
    });
});
