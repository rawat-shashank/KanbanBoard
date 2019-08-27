import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { 
    boardPageRoute,
    BoardPageComponent,
    TaskListComponent
} from '.';

const ENTITY_STATES = [...boardPageRoute];

@NgModule({
    imports: [
        CommonModule,
        DragDropModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BoardPageComponent,
        TaskListComponent
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