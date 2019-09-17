import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-task-list',
    templateUrl: 'task-list.component.html',
    styleUrls: ['task-list.component.scss'],
})

export class TaskListComponent {
    todo = [
        'Get to work',
        'Get up',
      ];
    
      inProgress = [
        'Get up',
        'Brush teeth',
      ];

      done = [
        'Take a shower',
        'Check e-mail',
        'Walk dog'
      ];
    
      drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
          transferArrayItem(event.previousContainer.data,
                            event.container.data,
                            event.previousIndex,
                            event.currentIndex);
        }
    }
}