import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-terminal-item',
  templateUrl: './terminal-item.component.html',
  styleUrls: ['./terminal-item.component.scss']
})
export class TerminalItemComponent implements OnInit {
  command: string;
  output: string;
  prompt: string;
  constructor() { 
    this.prompt = "prompt> ";
    this.command = "echo";
    this.output = "echo";
  }

  ngOnInit(): void {
  }

}
