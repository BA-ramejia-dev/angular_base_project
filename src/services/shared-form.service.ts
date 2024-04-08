import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedFormService {
    private formSubmitSubject = new BehaviorSubject<boolean>(false);
    submitFormObservable$ = this.formSubmitSubject.asObservable();

    private httpRequestSubject = new BehaviorSubject<boolean>(false);
    httpRequestObservable$ = this.httpRequestSubject.asObservable();

    triggerFormSubmit() {
        this.formSubmitSubject.next(true);
    }

    resetShouldSubmit() {
        this.formSubmitSubject.next(false);
    }

    setIsHttpRequestRunning(isRunning: boolean) {
        this.httpRequestSubject.next(isRunning);
    }
}
