import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppMaterialModule } from "../app-material.module";

@NgModule({
  imports: [CommonModule, FormsModule, AppMaterialModule],
  exports: [CommonModule, FormsModule, AppMaterialModule]
})
export class SharedModule {}
