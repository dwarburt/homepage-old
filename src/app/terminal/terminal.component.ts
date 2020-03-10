import { Component, OnInit } from '@angular/core';
import { TerminalRow } from '../terminal-row';
import { ExecutorService } from '../executor.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {
  history: TerminalRow[];
  constructor(public executorService : ExecutorService) {

  }
  ngOnInit(): void {
    this.history = [];

  }
  run(cmdInput: HTMLInputElement): void {
    let command = cmdInput.value;
    cmdInput.value = '';
    this.history.push(this.executorService.run(command));
  }
}
