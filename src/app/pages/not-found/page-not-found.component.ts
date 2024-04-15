import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '@/app/app.routes';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
    constructor(private router: Router) {}

    handleOnClick(): void {
        this.router.navigate([APPLICATION_ROUTES.LOGIN]);
    }
}
