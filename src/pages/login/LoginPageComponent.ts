import { Component } from '@angular/core';
import { APPLICATION_ROUTES } from '@/app/app.routes';
import { Router } from '@angular/router';
import { LoggerService } from '@/services/logger/logger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { parseErrorResponse } from '@/utils/httpUtils';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
    ModalContent,
    ModalBodyComponent
} from '@/components/common/modal/modal-body/ModalBodyComponent';
import { DIALOG_COMMON_CONFIG } from '@/utils/messagesUtils';
import { LoginComponent } from '@/components/login/LoginComponent';
import { ModalFooterComponent } from '@/components/common/modal/modal-footer/ModalFooterComponent';
import { JwtService } from '@/services/jwt/jwt.service';
import { AuthResponse } from '@/services/auth/auth.service.types';

@Component({
    selector: 'app-login-page',
    templateUrl: './LoginPageComponent.html',
    styleUrls: ['./LoginPageComponent.css'],
    imports: [LoginComponent],
    standalone: true,
    providers: [DialogService]
})
export class LoginPageComponent {
    // Referencia al diálogo para mostrar errores y advertencias
    dialogRef: DynamicDialogRef | undefined;

    constructor(
        private router: Router,
        private jwtUtils: JwtService,
        private loggerService: LoggerService,
        private dialogService: DialogService
    ) {}

    onLoginSuccess({ token }: AuthResponse): void {
        this.loggerService.log('Login succeed...');
        this.jwtUtils.setToken(token);
        this.navigateToDashboard();
    }

    onLoginFailure(errorResponse: HttpErrorResponse): void {
        const { body, header } = parseErrorResponse(errorResponse);
        this.openDialog(body, header);
    }

    openDialog(content: string, header: string) {
        /*
         * Al momento de abrir el diálogo, el primer parámetro es un componente que sirve como la base para el modal y
         * luego como segundo parámetro pasamos un objeto de configuración con las propiedades que queremos para el
         * diálogo.
         */
        this.dialogRef = this.dialogService.open(ModalBodyComponent, {
            ...DIALOG_COMMON_CONFIG,
            header,
            data: {
                content
            } as ModalContent,
            templates: {
                footer: ModalFooterComponent
            }
        });
    }

    navigateToDashboard() {
        this.router.navigate([APPLICATION_ROUTES.DASHBOARD]);
    }
}
