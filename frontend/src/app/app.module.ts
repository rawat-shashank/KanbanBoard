import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { FeatureModule } from './features/feature.module';
import { StoreModule } from '@ngrx/store';

import {
  LayoutComponent,
  MainComponent,
  FooterComponent,
  ErrorComponent
}
from './layout';
import { appReducer } from './app.reducer';

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
    AppMaterialModule,
    StoreModule.forRoot({ui: appReducer})
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule { }
