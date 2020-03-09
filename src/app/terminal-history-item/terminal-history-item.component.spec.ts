import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalHistoryItemComponent } from './terminal-history-item.component';

describe('TerminalHistoryItemComponent', () => {
  let component: TerminalHistoryItemComponent;
  let fixture: ComponentFixture<TerminalHistoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalHistoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalHistoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
