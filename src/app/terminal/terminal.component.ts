import { Component, OnInit } from '@angular/core';
import { TerminalRow } from '../terminal-row';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {
  history: TerminalRow[];
  ngOnInit(): void {
    this.history = [];

  }
  run(cmdInput: HTMLInputElement): void {
    let command = cmdInput.value;
    cmdInput.value = '';
    this.history.push({
      prompt: "prompt> ",
      command: command,
      output: "ok"
    })
  }

}
