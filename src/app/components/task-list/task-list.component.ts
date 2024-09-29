import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task } from '../../interfaces/task.interface';
import { TaskService } from '../../services/task.service';

type FilterType = 'all' | 'completed' | 'pending';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})

export class TaskListComponent implements OnInit {
  private filterSubject = new BehaviorSubject<FilterType>('all');
  currentFilter: FilterType = 'all';
  filteredTasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.filteredTasks$ = combineLatest([
      this.taskService.tasks$,
      this.filterSubject
    ]).pipe(
      map(([tasks, filter]) => {
        switch (filter) {
          case 'completed':
            return tasks.filter(task => task.completed);
          case 'pending':
            return tasks.filter(task => !task.completed);
          default:
            return tasks;
        }
      })
    );
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe();
  }

  filterTasks(filter: FilterType): void {
    this.filterSubject.next(filter);
    this.currentFilter = filter;
  }

  toggleTaskCompletion(task: Task): void {
    this.taskService.toggleTaskCompletion(task).subscribe();
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe();
  }
}