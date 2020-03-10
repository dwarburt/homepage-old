import { Tokenizer } from './tokenizer';

export class Command {
  cmd: string;
  args: string[];
  constructor(command_line: string) {
    let tokens = new Tokenizer(command_line).getTokens();
    if (tokens.length > 0) {
        this.cmd = tokens.shift();
        this.args = tokens;
    }
  }
}