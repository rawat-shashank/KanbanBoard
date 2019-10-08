import { NgModule } from "@angular/core";
import { RouterModule, ExtraOptions, Routes } from "@angular/router";
import { AuthGuard } from "./core/auth/auth.guard";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./core/core.module").then(m => m.CoreModule)
  },
  {
    path: "board",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./features/feature.module").then(m => m.FeatureModule)
  },
  { path: "", redirectTo: "auth/login", pathMatch: "full" },
  { path: "**", redirectTo: "auth/login" }
];

const config: ExtraOptions = {
  useHash: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
