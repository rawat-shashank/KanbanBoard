import { Routes } from '@angular/router';
import { BoardPageComponent } from './pages/board.page';
// import { UserRouteAccessService } from 'app/core';

export const boardPageRoute: Routes = [
    {
        path: '',
        component: BoardPageComponent,
        // canActivate: [UserRouteAccessService]
    }
];
