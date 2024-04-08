import { Injectable } from '@angular/core';
import { environment } from '@/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    private readonly isSafeEnv: boolean = false;

    constructor() {
        this.isSafeEnv = !environment.isProduction;
    }

    log(...data: any[]) {
        if (this.isSafeEnv) {
            // eslint-disable-next-line no-console
            console.log(...data);
        }
    }

    warning(...data: any[]) {
        if (this.isSafeEnv) {
            // eslint-disable-next-line no-console
            console.warn(...data);
        }
    }

    error(...data: any[]) {
        if (this.isSafeEnv) {
            // eslint-disable-next-line no-console
            console.error(...data);
        }
    }
}
