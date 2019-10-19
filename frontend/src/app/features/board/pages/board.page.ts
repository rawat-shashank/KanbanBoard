import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-page',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss']
})

export class BoardPageComponent implements OnInit {

  constructor(private boardService: BoardService){}

  ngOnInit(){
    this.boardService.getAllTasks();
  }
}
