import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DIALOG_COMMON_CONFIG } from '@/utils/messagesUtils';
import { ModalEnhancedFooterComponent } from '@/components/common/modal/modal-enhanced-footer/ModalEnhancedFooterComponent';
import { Message, MessageService } from 'primeng/api';
import { IdValuePair } from '@/utils/commonTypes';
import {
    AddEditTeamComponent,
    EditTeamPayload
} from '@/components/misc/add-edit-team/AddEditTeamComponent';
import { AddUserToTeamComponent } from '@/components/misc/add-user-to-team/AddUserToTeamComponent';
import { Team, TeamState } from '@/services/teams/teams.service.types';
import { TeamsService } from '@/services/teams/teams.service';

@Component({
    selector: 'app-teams',
    standalone: true,
    imports: [ButtonModule, ToolbarModule, TableModule, RippleModule, InputTextModule],
    templateUrl: './TeamsComponent.html'
})
export class TeamsComponent implements OnInit {
    dialogRef: DynamicDialogRef | undefined;
    teams: Team[] = [];

    constructor(
        private teamService: TeamsService,
        private dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadTeams();
    }

    loadTeams() {
        this.teamService.getAllTeams().subscribe({
            next: (response) => {
                this.teams = response;
            },
            error: (_httpError: HttpErrorResponse) => {
                this.teams = [];
            }
        });
    }

    handleAddNewRecord() {
        this.dialogRef = this.openAddEditTeamDialog('Agregar equipo', null);
        this.dialogRef.onClose.subscribe((data: Message) => {
            this.messageService.add(data);
            this.loadTeams();
        });
    }

    handleEditRecord({ name, description, id, leaderId, leaderName }: Team) {
        const initialFormData: EditTeamPayload = {
            name,
            description,
            id,
            state: TeamState.ACTIVE,
            leader: { id: leaderId, value: leaderName }
        };

        this.dialogRef = this.openAddEditTeamDialog('Editar equipo', initialFormData);
        this.dialogRef.onClose.subscribe((data: Message) => {
            this.messageService.add(data);
            this.loadTeams();
        });
    }

    handleAddNewMember({ id, name }: Team) {
        const team: IdValuePair = {
            id,
            value: name
        };

        this.dialogRef = this.openAddUserToTeamDialog('Agregar usuario', team);
        this.dialogRef.onClose.subscribe((data: Message) => {
            this.messageService.add(data);
        });
    }

    openAddEditTeamDialog(header: string, data: EditTeamPayload | null): DynamicDialogRef {
        return this.dialogService.open(AddEditTeamComponent, {
            ...DIALOG_COMMON_CONFIG,
            header,
            data,
            templates: {
                footer: ModalEnhancedFooterComponent
            }
        });
    }

    openAddUserToTeamDialog(header: string, data: IdValuePair): DynamicDialogRef {
        return this.dialogService.open(AddUserToTeamComponent, {
            ...DIALOG_COMMON_CONFIG,
            header,
            data,
            templates: {
                footer: ModalEnhancedFooterComponent
            }
        });
    }
}
