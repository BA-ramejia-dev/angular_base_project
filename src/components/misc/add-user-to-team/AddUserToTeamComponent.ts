import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { MESSAGE_MAX_LIFE } from '@/utils/messagesUtils';
import { MessageService } from 'primeng/api';
import { SharedFormService } from '@/services/shared-form.service';
import { LoggerService } from '@/services/logger/logger.service';
import { IdValuePair } from '@/utils/commonTypes';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputFieldErrorsComponent } from '@/components/common/input-field-errors/InputFieldErrorsComponent';
import { NgIf } from '@angular/common';
import { FormWrapperComponent } from '@/components/common/modal/FormWrapperComponent';
import { TeamsService } from '@/services/teams/teams.service';
import { UserService } from '@/services/users/users.service';
import { AddUserToTeam } from '@/services/users/users.service.types';

interface FormElements {
    selectedTeam: FormControl<IdValuePair | null>;
    selectedUser: FormControl<IdValuePair | null>;
}

@Component({
    selector: 'app-add-user-to-team',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        DropdownModule,
        InputFieldErrorsComponent,
        AutoCompleteModule,
        NgIf
    ],
    templateUrl: './AddUserToTeamComponent.html'
})
export class AddUserToTeamComponent extends FormWrapperComponent implements OnDestroy, OnInit {
    /* Form */
    formGroup: FormGroup<FormElements>;
    formHasBeenSubmitted: boolean = false;
    teams: IdValuePair[] = [];

    /* Users autocomplete */
    filteredUsers: IdValuePair[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private teamsService: TeamsService,
        private userService: UserService,
        private messageService: MessageService,
        private loggerService: LoggerService,
        private dynamicDialogConfig: DynamicDialogConfig<IdValuePair>,
        private dialogRef: DynamicDialogRef,
        protected override sharedFormService: SharedFormService
    ) {
        super(sharedFormService);
        this.formGroup = this.formBuilder.group({
            selectedTeam: new FormControl<IdValuePair | null>(null, {
                validators: Validators.required
            }),
            selectedUser: new FormControl<IdValuePair | null>(null, {
                validators: Validators.required
            })
        });
        this.initializeForm();
    }

    override ngOnInit() {
        super.ngOnInit();
        this.fetchAllTeams();
    }

    override ngOnDestroy() {
        super.ngOnDestroy();
        this.formGroup.reset();
    }

    initializeForm() {
        if (this.dynamicDialogConfig.data) {
            this.formGroup.patchValue({
                selectedTeam: this.dynamicDialogConfig.data
            });
        }
    }

    fetchAllTeams() {
        this.teamsService.getAllTeams().subscribe({
            next: (response) => {
                this.teams = response.map(({ id, name }) => {
                    return {
                        id,
                        value: name
                    };
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.loggerService.error(httpError);
            }
        });
    }

    filterUsers(event: AutoCompleteCompleteEvent) {
        const query = event.query;
        this.userService.findUserByName(query).subscribe({
            next: (response) => {
                this.filteredUsers = response.map(({ id, name }) => {
                    return {
                        id,
                        value: name
                    };
                });
            },
            error: (httpError: HttpErrorResponse) => {
                this.loggerService.error(httpError);
            }
        });
    }

    override handleOnFormSubmit() {
        this.formHasBeenSubmitted = true;
        if (this.formGroup.valid) {
            const { selectedTeam, selectedUser } = this.formGroup.controls;
            const payload: AddUserToTeam = {
                userId: selectedUser.value?.id!,
                teamId: selectedTeam.value?.id!
            };

            this.teamsService.addUserToTeam(payload).subscribe({
                next: (_response) => {
                    this.onSuccess();
                },
                error: (httpError: HttpErrorResponse) => {
                    this.onFailure(httpError);
                }
            });
        }
    }

    onSuccess() {
        const { selectedTeam, selectedUser } = this.formGroup.controls;
        this.messageService.add({
            severity: 'success',
            detail: `${selectedUser.value?.value} fue agregado exitosamente al equipo: ${selectedTeam.value?.value}`,
            life: MESSAGE_MAX_LIFE
        });
        this.resetForm();
        this.dialogRef.close();
    }

    onFailure(errorResponse: HttpErrorResponse) {
        const { selectedTeam, selectedUser } = this.formGroup.controls;
        this.messageService.add({
            severity: 'error',
            summary: errorResponse.status.toString(),
            detail: `Ocurrió un error al tratar de agregar el usuario ${selectedUser.value?.value} al equipo: ${selectedTeam.value?.value}`,
            life: MESSAGE_MAX_LIFE
        });
    }

    resetForm() {
        this.formHasBeenSubmitted = false;
        this.formGroup.reset();
    }
}
