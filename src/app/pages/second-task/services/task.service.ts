import { Injectable } from '@angular/core';
import { TasksKey } from '../../../shared/data/keys';
import { StorageService } from '../../../shared/services/storage.service';
import { Task } from '../interfaces/task';
import { SummaryItem } from '../interfaces/summary-items';
import { priorities } from '../constants/priorities';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private storageService: StorageService) {}

  saveTasks(tasks: Task[]): void {
    this.storageService.saveArrayData(TasksKey, tasks);
  }

  getTasks(): Task[] | null {
    const tasks = this.storageService.getArrayData(TasksKey);
    return tasks ? (tasks as Task[]) : null;
  }

  createTask(task: string, priority: number): void {
    const existingTasks: Task[] | null = this.getTasks();
    const newTask: Task = { task, priority };

    if (existingTasks === null) {
      const newArray: Task[] = [newTask];
      this.saveTasks(newArray);
    } else {
      existingTasks.push(newTask);
      this.saveTasks(existingTasks);
    }
  }

  editTask(index: number, updatedTask: string, updatedPriority: number): void {
    const existingTasks: Task[] | null = this.getTasks();

    if (existingTasks !== null && index >= 0 && index < existingTasks.length) {
      existingTasks[index].task = updatedTask;
      existingTasks[index].priority = updatedPriority;
      this.saveTasks(existingTasks);
    }
  }

  deleteTask(index: number): void {
    const existingTasks: Task[] | null = this.getTasks();

    if (existingTasks !== null && index >= 0 && index < existingTasks.length) {
      existingTasks.splice(index, 1);
      this.saveTasks(existingTasks);
    }
  }

  getSummaryItems(): SummaryItem[] {
    const existingTasks: Task[] | null = this.getTasks();
    const summaryItems: SummaryItem[] = [];

    if (existingTasks) {
      priorities.forEach(priorityObj => {
        const priorityKey = Number(Object.keys(priorityObj)[0]);
        const priorityLabel = priorityObj[priorityKey];
        const count = existingTasks.filter(task => task.priority == priorityKey).length;

        const summaryItem: SummaryItem = {
          priority: priorityLabel,
          sum: count,
        };
        summaryItems.push(summaryItem);
      });
    }

    return summaryItems;
  }
}
