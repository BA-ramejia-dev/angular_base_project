import { Routes } from '@angular/router';
import { redirectIfAuthenticated, requiresAuthentication } from '@/app/security/guards/auth.guard';
import { TeamsPageComponent } from '@/app/pages/teams/teams.page.component';
import { LoginPageComponent } from '@/app/pages/login/login-page.component';
import { DashboardPageComponent } from '@/app/pages/dashboard/dashboard-page.component';
import { PageNotFoundComponent } from '@/app/pages/not-found/page-not-found.component';

/**
 * Este enum sirve para llevar un control de las rutas de la aplicación, de esta forma vamos a poder realizar
 * redirecciones y validaciones de forma más sencilla. Esto ayuda a prevenir posibles errores al escribir las rutas
 * manualmente.
 */
export enum APPLICATION_ROUTES {
    LOGIN = '',
    DASHBOARD = 'dashboard',
    REQUESTS = 'solicitudes',
    TEAMS = 'teams',
    PAGE_NOT_FOUND = '**'
}

/**
 * Esta es la lista de rutas que maneja la aplicación, cada una de las rutas se mapea a un `PageComponent` en
 * específico. También se definen los `guards` que se van a usar para proteger las rutas, por ejemplo: supongamos que
 * una página requiere autenticación, entonces se le agregaría `canActivate: [requiresAuthentication]`
 *
 * Si una ruta requiere multiples `guards` los agregamos en la propiedad `canActivate` en el orden en que deseamos que
 * se ejecuten. Por ejemplo: quiero que primero se valide autenticación y luego se valide si el usuario tiene permisos
 * de Administrador.
 */
export const routes: Routes = [
    {
        path: APPLICATION_ROUTES.LOGIN,
        component: LoginPageComponent,
        canActivate: [redirectIfAuthenticated]
    },
    {
        path: APPLICATION_ROUTES.DASHBOARD,
        component: DashboardPageComponent,
        canActivate: [requiresAuthentication]
    },
    {
        path: APPLICATION_ROUTES.TEAMS,
        component: TeamsPageComponent,
        canActivate: [requiresAuthentication]
    },
    {
        path: APPLICATION_ROUTES.PAGE_NOT_FOUND,
        component: PageNotFoundComponent
    }
];
