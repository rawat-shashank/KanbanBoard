import { Component, Input } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss']
})

export class BoardPageComponent {

  constructor(
    private boardService: BoardService
    ){
      this.boardService.getAllTasks();
  }
}
