import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "board",
        loadChildren: () =>
          import("./board/board.module").then(m => m.BoardModule)
      },
      { path: '', redirectTo: 'board', pathMatch: 'full' },
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeatureModule {}
