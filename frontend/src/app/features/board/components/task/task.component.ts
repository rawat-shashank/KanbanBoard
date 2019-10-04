import { Component, Input } from '@angular/core';
import { Task } from '../../board.model';

@Component({
    selector: 'app-task',
    templateUrl: 'task.component.html',
    styleUrls: ['task.component.scss'],
})

export class TaskComponent {
    task : Task
    @Input()
    set setTaskData(input: Task) {
        if (input) {
            this.task = input;
        }
    }
}