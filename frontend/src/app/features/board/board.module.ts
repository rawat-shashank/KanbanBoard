import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from 'src/app/app-material.module';

import { 
    boardPageRoute,
    BoardPageComponent,
    TaskListComponent,
    TaskComponent
} from '.';

const ENTITY_STATES = [...boardPageRoute];

@NgModule({
    imports: [
        CommonModule,
        AppMaterialModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BoardPageComponent,
        TaskListComponent,
        TaskComponent
    ],
    entryComponents: [
        BoardPageComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class BoardModule {
    constructor() {
        
    }
}