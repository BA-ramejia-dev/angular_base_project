import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControls } from '@/utils/formUtils';
import { HttpErrorResponse } from '@angular/common/http';
import { InputFieldErrorsComponent } from '@/components/common/input-field-errors/InputFieldErrorsComponent';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { NgOptimizedImage } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { AuthPayload, AuthResponse } from '@/services/auth/auth.service.types';
import { AuthService } from '@/services/auth/auth.service';

// Está interfaz sirve para definir todos los elementos que tiene el formulario
interface LoginFormElements {
    userName: string;
    password: string;
}

@Component({
    // El selector del componente siempre inicia con la palabra `app-` esta regla es forzada mediante ESLint
    selector: 'app-login',

    // Este componente no utiliza una hoja de estilos, solo el marcado HTML
    templateUrl: './LoginComponent.html',

    // Desde Angular 17, se recomienda utilizar componentes standalone
    standalone: true,

    // Los componentes `standalone` deben importar de forma explícita los módulos que necesitas
    imports: [
        InputFieldErrorsComponent,
        ReactiveFormsModule,
        PasswordModule,
        ButtonModule,
        NgOptimizedImage,
        InputTextModule
    ]
})
export class LoginComponent {
    // Propiedades de entrada, es una buena práctica proveer un valor inicial para aquella que no sean obligatorias
    @Input() applicationName: string = 'Sistema de Gestión de ABC';
    @Input() welcomeMessage: string = '¡Bienvenido!';
    @Input() securityMessage: string = 'Por favor ingresa tus credenciales';
    @Input() loginButtonText: string = 'Iniciar sesión';

    // Propiedades de salida, sirven para informar eventos de éxito o fracaso
    @Output() loginSuccess = new EventEmitter<AuthResponse>();
    @Output() loginFailure = new EventEmitter<HttpErrorResponse>();

    // Elementos del formulario
    formGroup: FormGroup<FormControls<LoginFormElements>>;

    // Esto sirve para poner el botón de submit en disabled mientras se procesa la petición
    isLoading: boolean = false;

    // Indica si el formulario ha sido enviado al menos una vez, no importa si fué exitoso o no
    formHasBeenSubmitted: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) {
        // Inicialización de los campos del formulario, cualquier validación debe ser agregada aquí
        this.formGroup = this.formBuilder.group({
            userName: ['', [Validators.required, Validators.minLength(5)]],
            password: ['', [Validators.required, Validators.minLength(5)]]
        });
    }

    // Esta función es ejecutada cuando se intente enviar el formulario
    handleOnFormSubmit(): void {
        this.formHasBeenSubmitted = true;

        // Si el estado del formulario no es válido, indica que hay campos que no cumplen con algunas validaciones
        if (this.formGroup.valid) {
            const { userName, password } = this.formGroup.controls;
            const payload: AuthPayload = {
                userName: userName.value!,
                password: password.value!
            };

            // Poner el botón en estado de carga
            this.isLoading = true;

            /*
             * La responsabilidad de que hacer si el login es exitoso o fallido recae en el componente padre.
             * Aquí nos limitamos a simplemente mediante las propiedades de salida informarle que un evento ocurrió.
             */
            this.authService.login(payload).subscribe({
                next: (response: AuthResponse) => {
                    this.isLoading = false;
                    this.loginSuccess.emit(response);
                },
                error: (httpError: HttpErrorResponse) => {
                    this.isLoading = false;
                    this.loginFailure.emit(httpError);
                }
            });
        }
    }
}
