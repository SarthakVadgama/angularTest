import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { Todo } from '../model/todo.type';
import { catchError } from 'rxjs';

@Component({
  selector: 'todos',
  imports: [],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit{
  todoService = inject(TodosService);
  todoItems =  signal<Array<Todo>>([]);
  ngOnInit(): void {
     // console.log(this.todoService.todoItems);
     this.todoService
     .getTodosFromApi()
     .pipe(
      catchError((err)=>{
        console.log(err);
        throw err;
      })
     )
     .subscribe((todos) => {
      this.todoItems.set(todos);
     });
    }
}
