import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
      },
      { path: "", redirectTo: "login", pathMatch: "full" }
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CoreModule {}
