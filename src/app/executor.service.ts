import { Injectable, EventEmitter } from '@angular/core';
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
  terminalEvents = new EventEmitter();
  constructor() {
    this._prompt = `<span class="prompt-username">guest</span>` +
      `<span class="prompt-at">@</span>` +
      `<span class="prompt-hostname">rubbersoft.com</span>` +
      `<span class="prompt-terminator">$&nbsp;</span>`;
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
    return this.makeTable(commandTable);
  }
  @CommandFunc("retrieve contact information.")
  private contact(args: string[]): string {
    let email = atob("ZGF2aWRAcnViYmVyc29mdC5jb20K");
    return this.makeTable({
      "cell phone": atob("KDg1OSkgNjA4LTIwNjg="),
      "email (personal)": atob("ZGF2aWQud2FyYnVydG9uQGdtYWlsLmNvbQ=="),
      "email (contracting)": atob("ZGF2aWRAcnViYmVyc29mdC5jb20K"),
      "twitter": atob("QGR3YXJidXJ0Cg==")
    })
  }
  @CommandFunc("display a list of files that can be downloaded")
  private ls(args: string[]): string {
    return this.makeTable({
      "resume.pdf": "Resume for David Warburton in PDF format.",
      "gravatar.png": "low resolution contact profile image for David Warburton"
    })
  }
  @CommandFunc("Download a binary file. Usage: download <filename>")
  private download(args: string[]): string {
    window.open(`assets/${args[0]}`)
    return "";
  }
  @CommandFunc("Display the message of the day")
  private motd(args: string[]): string {
    return `<h1>Command Terminal</h1>
      <p>welcome to the rubbersoft.com homepage text based interface.
      Use this terminal to interact with the homepage. use 'help' to 
      get a list of commands to browse files, download them, or retrieve other information.</p>`
  }
  @CommandFunc("Clear the previous commands from the terminal")
  private clear(args: string[]): string {
    this.terminalEvents.emit('clear');
    return '';
  }
  private makeTable(tbl : object) : string {
    let ret = '<table>';
    for (let prop in tbl) {
      ret += `<tr><td>${prop}</td><td class="padleft">${tbl[prop]}</td></tr>`;
    }
    return ret + '</table>';
  }
}
