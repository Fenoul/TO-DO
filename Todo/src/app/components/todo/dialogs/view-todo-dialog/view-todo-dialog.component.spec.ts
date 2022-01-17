import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodoDialogComponent } from './view-todo-dialog.component';

describe('ViewTodoDialogComponent', () => {
  let component: ViewTodoDialogComponent;
  let fixture: ComponentFixture<ViewTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTodoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
