export class Tokenizer {
  mode = 'normal';
  bsReturnMode = 'normal'
  tokens: string[] = [];
  curtok = '';
  constructor(private line: string) {}

  public getTokens(): string[] {
    [...this.line].forEach(char => {
      switch (this.mode) {
          case 'normal': this.consumeNormal(char); break;
          case 'bs': this.consumeBs(char); break;
          case 'double-quote': this.consumeDbl(char); break;
      }
    })
    if (this.curtok.length > 0) {
      this.tokens.push(this.curtok);
    }
    return this.tokens;
  }
  consumeDbl(char: string) {
    switch(char) {
      case '"':
        this.mode = 'normal';
        break;
      case '\\':
        this.mode = 'bs';
        this.bsReturnMode = 'double-quote';
        break;
      default:
        this.curtok += char;
        break;
    }
  }
  consumeBs(char: string) {
    switch (char) {
      case '"':
        this.curtok += char;
        break;
      case '\\':
        this.curtok += char;
        break;
      case 'n':
        this.curtok += "\n";
        break;
      case "'":
        this.curtok += "'";
        break;
      case ' ':
        this.curtok += ' ';
        break;
    }
    this.mode = this.bsReturnMode;
  }
  consumeNormal(char: string) {
    switch (char) {
      case '"':
        this.mode = 'double-quote';
        break;
      case '\\':
        this.bsReturnMode = 'normal';
        this.mode = 'bs';
        break;
      case ' ':
        if (this.curtok.length > 0) {
          this.tokens.push(this.curtok);
          this.curtok = '';
        }
        break;
      default:
        this.curtok += char;
        break;
    }
  }
}