import { Component, OnDestroy } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControls } from '@/app/utils/formUtils';
import { Message, MessageService } from 'primeng/api';
import { MESSAGE_MAX_LIFE } from '@/app/utils/messagesUtils';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SharedFormService } from '@/app/services/shared-form.service';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { LoggerService } from '@/app/services/logger/logger.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputFieldErrorsComponent } from '@/app/components/common/input-field-errors/input-field-errors.component';
import { FormWrapperComponent } from '@/app/components/common/modal/form-wrapper.component';
import { TeamsService } from '@/app/services/teams/teams.service';
import { CreateTeam, EditTeam, Team, TeamState } from '@/app/services/teams/teams.service.types';
import { UserService } from '@/app/services/users/users.service';
import { IdValuePair } from '@/app/utils/commonTypes';

// Controles del formulario
interface TeamFormElements {
    id: number;
    name: string;
    description: string;
    state: TeamState;
    leader: IdValuePair;
}

// Al momento de editar un equipo, se debe indicar el ID del registro que estamos editando y los datos actuales
export interface EditTeamPayload extends TeamFormElements {
    id: number;
}

// El formulario tiene soporte para modo de creación y edición de registros
enum FormModes {
    CREATE = 'CREATE',
    EDIT = 'EDIT'
}

@Component({
    selector: 'app-add-edit-teams',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        InputFieldErrorsComponent,
        AutoCompleteModule,
        RadioButtonModule,
        InputTextModule,
        InputTextareaModule
    ],
    templateUrl: './add-edit-team.component.html'
})
export class AddEditTeamComponent extends FormWrapperComponent implements OnDestroy {
    protected readonly TeamState = TeamState;

    /* Form */
    formGroup: FormGroup<FormControls<TeamFormElements>>;
    formHasBeenSubmitted: boolean = false;
    formMode: FormModes = FormModes.CREATE;

    /* Users autocomplete */
    filteredUsers: IdValuePair[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService,
        private dynamicDialogConfig: DynamicDialogConfig<EditTeamPayload>,
        protected override sharedFormService: SharedFormService,
        private dialogRef: DynamicDialogRef,
        private teamsService: TeamsService,
        private userService: UserService,
        private loggerService: LoggerService
    ) {
        super(sharedFormService);
        this.formGroup = this.formBuilder.group({
            id: [0],
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            state: [TeamState.ACTIVE, [Validators.required]],
            leader: new FormControl<IdValuePair | null>(null, {
                validators: Validators.required
            })
        });
        this.initializeForm();
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.formGroup.reset();
    }

    initializeForm() {
        // Verificar si el dialogo está proporcionando algún dato, esto ocurrirá en modo edición
        if (this.dynamicDialogConfig.data) {
            this.loggerService.log('Initializing form in edit mode...');
            this.formMode = FormModes.EDIT;
            this.formGroup.patchValue(this.dynamicDialogConfig.data);
        } else {
            this.loggerService.log('Initializing form in create mode...');
            this.formMode = FormModes.CREATE;
        }
    }

    filterUsers({ query }: AutoCompleteCompleteEvent) {
        this.userService.findUserByName(query).subscribe({
            next: (response) => {
                this.filteredUsers = response.map(({ id, name }) => ({
                    id,
                    value: name
                }));
            },
            error: (httpError: HttpErrorResponse) => {
                this.loggerService.error(httpError);
            }
        });
    }

    override handleOnFormSubmit(): void {
        this.formHasBeenSubmitted = true;
        this.loggerService.log('Running form submit logic');
        if (this.formGroup.valid) {
            if (this.formMode === FormModes.CREATE) {
                this.addTeam();
            } else {
                this.editTeam();
            }
        }
    }

    addTeam() {
        const { name, description, state, leader } = this.formGroup.controls;
        const payload: CreateTeam = {
            name: name.value!,
            description: description.value!,
            state: state.value!,
            leaderId: leader.value?.id!
        };

        this.teamsService.createTeam(payload).subscribe({
            next: (response) => {
                this.onSuccess(response);
            },
            error: (httpError: HttpErrorResponse) => {
                this.onFailure(httpError);
            }
        });
    }

    editTeam() {
        const { id, name, description, state, leader } = this.formGroup.controls;
        const payload: EditTeam = {
            id: id.value!,
            name: name.value!,
            description: description.value!,
            state: state.value!,
            leaderId: leader.value?.id!
        };

        this.teamsService.editTeam(payload).subscribe({
            next: (response) => {
                this.onSuccess(response);
            },
            error: (httpError: HttpErrorResponse) => {
                this.onFailure(httpError);
            }
        });
    }

    onSuccess(createdTeam: Team) {
        const message: Message = {
            severity: 'success',
            detail: `Equipo ${createdTeam.name} ${this.formMode === FormModes.CREATE ? 'creado' : 'editado'} exitosamente`,
            life: MESSAGE_MAX_LIFE
        };
        this.dialogRef.close(message);
    }

    onFailure(errorResponse: HttpErrorResponse): void {
        const detail =
            errorResponse.status === 409
                ? 'Ya existe un equipo con ese nombre, intenta nuevamente'
                : 'Ocurrió un error al tratar de crear el equipo, intenta nuevamente';

        const message: Message = {
            severity: errorResponse.status === 409 ? 'warn' : 'error',
            summary: errorResponse.status.toString(),
            detail,
            life: MESSAGE_MAX_LIFE
        };

        this.messageService.add(message);
    }
}
