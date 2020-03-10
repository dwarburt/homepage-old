import { Injectable } from '@angular/core';
import { TerminalRow } from './terminal-row'
import { Command } from './command';

let commandTable = {};
function CommandFunc(helpText: string) {
  return function (
    target: any, 
    propertyKey: string,
    descriptor: PropertyDescriptor) {
      commandTable[propertyKey] = helpText;
  }
}

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
  @CommandFunc("print the arguments.")
  private echo(args: string[]): string {
    return args.join(" ");
  }
  @CommandFunc("print a list of commands.")
  private help(args: string[]): string {
    let ret = '<table>';
    for (let func in commandTable) {
      ret += `<tr><td>${func}</td><td class="padleft">${commandTable[func]}</td></tr>`;
    }
    return ret;
  }
  @CommandFunc("retrieve contact information.")
  private contact(args: string[]): string {
    let email = atob("ZGF2aWRAcnViYmVyc29mdC5jb20K");
    return `Please direct emails to: <a href="mailto:${email}">${email}</a>`;
  }
}
