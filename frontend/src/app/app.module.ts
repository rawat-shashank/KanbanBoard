import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { FeatureModule } from './features/feature.module';

import {
  LayoutComponent,
  MainComponent,
  FooterComponent,
  ErrorComponent
}
from './layout';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FeatureModule,
    AppMaterialModule
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
