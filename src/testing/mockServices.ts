import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Type } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog/dynamicdialog-config';
import { getDummyJWT } from '@/testing/testingUtils';

export const mockLoginSuccessResponse = () => {
    const token = getDummyJWT();
    return {
        login: jest.fn().mockReturnValue(
            of({
                token
            })
        )
    };
};

export const mockLoginFailureResponse = () => {
    return {
        login: jest.fn().mockReturnValue(throwError(() => new HttpErrorResponse({ status: 500 })))
    };
};

export const mockDialogOpen = () => {
    return { open: jest.fn((_componentType: Type<never>, _config: DynamicDialogConfig) => {}) };
};

export const mockRouter = () => {
    return { navigate: jest.fn() };
};

export const mockJwtService = () => {
    return { setToken: jest.fn() };
};
