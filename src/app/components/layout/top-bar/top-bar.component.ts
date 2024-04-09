import { Component, OnInit } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '@/app/app.routes';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { JwtService } from '@/app/services/jwt/jwt.service';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    standalone: true,
    imports: [ButtonModule, SidebarModule, MenuModule]
})
export class TopBarComponent implements OnInit {
    protected mainMenuItems: MenuItem[] = [];
    protected userMenuItems: MenuItem[] = [];
    protected sidebarIsVisible: boolean = false;

    constructor(
        private jwtUtils: JwtService,
        private router: Router
    ) {}

    ngOnInit() {
        this.setMainMenuItems();
        this.setUserMenuItems();
    }

    setMainMenuItems() {
        this.mainMenuItems = [
            {
                items: [
                    {
                        label: 'Inicio',
                        icon: PrimeIcons.HOME,
                        command: () => {
                            this.router.navigate([APPLICATION_ROUTES.DASHBOARD]);
                        }
                    }
                ]
            },
            {
                label: 'Equipos',
                items: [
                    {
                        label: 'Crear Equipo',
                        icon: PrimeIcons.PLUS,
                        command: () => {
                            this.router.navigate([APPLICATION_ROUTES.TEAMS]);
                        }
                    }
                ]
            }
        ];
    }

    setUserMenuItems() {
        this.userMenuItems = [
            {
                label: 'Configuración',
                icon: PrimeIcons.COG
            },
            {
                label: 'Cerrar sesión',
                icon: PrimeIcons.SIGN_OUT,
                command: () => {
                    this.handleLogout();
                }
            }
        ];
    }

    handleLogout() {
        this.jwtUtils.removeToken();
        this.router.navigate([APPLICATION_ROUTES.LOGIN]);
    }
}
