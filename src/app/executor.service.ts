import { Injectable } from '@angular/core';
import { TerminalRow } from './terminal-row'
import { Command } from './command';

@Injectable({
  providedIn: 'root'
})
export class ExecutorService {
  private _prompt: string;
  get prompt() {
    return this._prompt;
  }
  constructor() {
    this._prompt = "guest@rubbersoft.com$ ";
   }
  run(command_line: string) : TerminalRow {
    let command = new Command(command_line);
    var output: string;
    if (this[command.cmd] != undefined) {
      output = this[command.cmd](command.args);
    } else {
      output = `‘${command.cmd}’: <span class="red">command not found</span>`;
    }
    return {
      command: command_line,
      prompt: this.prompt,
      output: output
    }
  }
  private echo(args: string[]): string {
    return args.join(" ");
  }
}
