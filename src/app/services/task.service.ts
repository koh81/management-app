import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://my-json-server.typicode.com/koh81/fake-server/tasks';
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl).pipe(
      tap(tasks => this.tasksSubject.next(tasks)),
      catchError(this.handleError)
    );
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      tap(newTask => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next([...currentTasks, newTask]);
      }),
      catchError(this.handleError)
    );
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentTasks = this.tasksSubject.getValue();
        this.tasksSubject.next(currentTasks.filter(task => task.id !== id));
      }),
      catchError(this.handleError)
    );
  }

  toggleTaskCompletion(task: Task): Observable<Task> {
    const updatedTask = { ...task, completed: !task.completed };
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, updatedTask).pipe(
      tap(updated => {
        const currentTasks = this.tasksSubject.getValue();
        const index = currentTasks.findIndex(t => t.id === updated.id);
        if (index !== -1) {
          const newTasks = [...currentTasks];
          newTasks[index] = updated;
          this.tasksSubject.next(newTasks);
        }
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}