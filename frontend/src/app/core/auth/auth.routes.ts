import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth.page';
import { UserLoginComponent } from './components/login/login.component';
import { UserRegisterComponent } from './components/register/register.component';

export const authPageRoute: Routes = [
    {
        path: '',
        component: AuthComponent,
        // canActivate: [UserRouteAccessService]
        children : [
            {
                path: 'login',
                component: UserLoginComponent,
            },
            {
                path: 'register',
                component: UserRegisterComponent,
                // canActivate: [UserRouteAccessService]
            }
        ]
    },
];
