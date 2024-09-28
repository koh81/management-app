import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
    this.filteredTasks$ = this.tasks$;
  }

  ngOnInit(): void {}

  filterTasks(filter: 'all' | 'completed' | 'pending'): void {
    this.filteredTasks$ = new Observable<Task[]>(observer => {
      this.tasks$.subscribe(tasks => {
        let filteredTasks: Task[];
        switch (filter) {
          case 'completed':
            filteredTasks = tasks.filter(task => task.completed);
            break;
          case 'pending':
            filteredTasks = tasks.filter(task => !task.completed);
            break;
          default:
            filteredTasks = tasks;
        }
        observer.next(filteredTasks);
      });
    });
  }

  toggleTaskCompletion(taskId: number): void {
    this.taskService.toggleTaskCompletion(taskId);
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }
}
