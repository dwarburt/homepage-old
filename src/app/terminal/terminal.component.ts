import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TerminalRow } from '../terminal-row';
import { ExecutorService } from '../executor.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {
  @ViewChild('cmdInput') cmdInput : ElementRef;
  history: TerminalRow[];
  constructor(public executorService : ExecutorService) {

  }
  ngOnInit(): void {
    this.history = [];
  }
  run(): void {
    let command = this.cmdInput.nativeElement.value;
    this.cmdInput.nativeElement.value = '';
    this.history.push(this.executorService.run(command));
  }
  focus() : void {
    if (window.getSelection().toString() === "") {
      this.cmdInput.nativeElement.focus();
    }
  }
}
