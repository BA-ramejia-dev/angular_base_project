import { HttpClient } from '@angular/common/http';
import { AuthService } from '@/app/services/auth/auth.service';
import { of } from 'rxjs';
import { AuthResponse } from '@/app/services/auth/auth.service.types';

jest.mock('@angular/common/http');

describe('AuthService', () => {
    let service: AuthService;
    let httpClient: HttpClient;

    beforeEach(() => {
        // @ts-ignore
        httpClient = new HttpClient(null);
        service = new AuthService(httpClient);
    });

    it('should call login API', () => {
        const payload = { userName: 'test', password: '1234' };
        service.login(payload);
        expect(httpClient.post).toHaveBeenCalledWith(expect.stringContaining('/auth'), payload);
    });

    it('should return response from login API', async () => {
        const payload = { userName: 'test', password: '1234' };
        const mockResponse = { token: '123' };
        jest.spyOn(httpClient, 'post').mockReturnValue(of(Promise.resolve(mockResponse)));
        const result = service.login(payload);
        result.subscribe({
            next: (response: AuthResponse) => {
                expect(response).toEqual(mockResponse);
            }
        });
    });
});
