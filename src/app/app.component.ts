import { Component } from '@angular/core';
import { TerminalService } from 'primeng/terminal/public_api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TerminalService]
})
export class AppComponent {
  title = 'app works!';
  constructor(private terminalService : TerminalService) {
    this.terminalService.commandHandler.subscribe(command => {
      let response = (command === 'date') ? new Date().toDateString() : 'Unknown command: ' + command;
      this.terminalService.sendResponse(response);
    });
  }
}
