import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/app/shared/models/todo-item.model';

@Component({
  selector: 'app-view-todo-dialog',
  templateUrl: './view-todo-dialog.component.html',
  styleUrls: ['./view-todo-dialog.component.scss']
})
export class ViewTodoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ViewTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem,) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
