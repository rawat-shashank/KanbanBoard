import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ErrorService {
    error = new Subject<{
        'message': string,
        'action': string
    }>();

    setNewError(message: string, action= ''){
        if (!message) {
            return
        }
        this.error.next({
            'message': message,
            'action': action
        });
    }

    getNewError() {
        if (this.error) {
            return this.error.asObservable();
        }
    }
}