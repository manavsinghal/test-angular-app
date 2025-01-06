import { Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AuthGuard } from './core/login/auth-guard';
import { ShellComponent } from './core/shell/shell.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
    {
        path: 'app',
        component: ShellComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home', // Path for the home component
                component: HomeComponent,
            },
            {
                path: '', pathMatch: 'full', redirectTo: 'home'
            }
        ]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: '', pathMatch: 'full', redirectTo: 'app/home',
    },
    {
        path: '**', pathMatch: 'full', redirectTo: 'app/home',
    }
];
