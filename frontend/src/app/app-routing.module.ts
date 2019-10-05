import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, Routes} from '@angular/router';

const routes: Routes = [
    {
      path: 'auth',
      loadChildren: () => import('./core/core.module')
        .then(m => m.CoreModule),
    },
    {
      path: 'board',
      loadChildren: () => import('./features/feature.module')
        .then(m => m.FeatureModule),
    },
    { path: '**', redirectTo: 'auth/login' },
];

const config: ExtraOptions = {
    useHash: false,
  };

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
