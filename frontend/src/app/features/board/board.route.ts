import { Routes } from "@angular/router";
import { BoardPageComponent } from "./pages/board.page";
import { AuthGuard } from "src/app/core/auth/auth.guard";

export const boardPageRoute: Routes = [
  {
    path: "",
    component: BoardPageComponent
  }
];
