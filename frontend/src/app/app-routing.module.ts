import { NgModule } from '@angular/core';
import { RouterModule, ExtraOptions, Routes} from '@angular/router';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./features/feature.module')
        .then(m => m.FeatureModule),
    },
    { path: '**', redirectTo: 'board' },
];

const config: ExtraOptions = {
    useHash: false,
  };

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
