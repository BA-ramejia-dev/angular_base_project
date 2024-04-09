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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(...data: any[]) {
        if (this.isSafeEnv) {
            // eslint-disable-next-line no-console
            console.log(...data);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warning(...data: any[]) {
        if (this.isSafeEnv) {
            // eslint-disable-next-line no-console
            console.warn(...data);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(...data: any[]) {
        if (this.isSafeEnv) {
            // eslint-disable-next-line no-console
            console.error(...data);
        }
    }
}
