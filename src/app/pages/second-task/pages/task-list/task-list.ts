import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { priorities } from '../../constants/priorities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inputs } from 'src/app/shared/interfaces/inputs';
import { Priority } from '../../interfaces/priorities';
import { inputs } from '../../constants/inputs';
import { SummaryItem } from '../../interfaces/summary-items';
import { HeaderItem } from 'src/app/shared/interfaces/header-items';
import { headerItems } from '../../constants/header-items';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css'],
})
export class TaskListComponent {
  headerItems: HeaderItem[] = headerItems;
  tasks: Task[] | null = [];
  editIndex: boolean[] = [];
  forms: FormGroup[] = [];
  inputs: Inputs = inputs;
  priorities: Priority[] = priorities;
  @ViewChild('prioritySelect') prioritySelect!: ElementRef;
  summaryItems: SummaryItem[] = [];

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.getSummaryItems();
    this.loadTasks();
  }

  getSummaryItems(): void {
    this.summaryItems = this.taskService.getSummaryItems();
  }

  getPriorityLabelByKey(key: number): string | undefined {
    const priorityObject = priorities.find(priority => priority[key] !== undefined);
    return priorityObject ? priorityObject[key] : undefined;
  }

  loadTasks() {
    this.tasks = this.taskService.getTasks();
    if (this.tasks != null) {
      this.editIndex = this.tasks.map(() => false);
      this.forms = this.tasks.map(task =>
        this.formBuilder.group({
          task: [task.task, Validators.required],
          priority: [task.priority, Validators.required],
        })
      );
    }
  }

  editTask(index: number) {
    this.editIndex[index] = true;
  }

  getKey(priority: Priority): number {
    return parseInt(Object.keys(priority)[0], 10);
  }

  getValue(priority: Priority): string {
    return priority[this.getKey(priority)];
  }

  onPriorityChange(event: any): void {
    const selectElement = event.target;
    if (selectElement.value === '') {
      this.renderer.addClass(this.prioritySelect.nativeElement, 'default-selection');
    } else {
      this.renderer.removeClass(this.prioritySelect.nativeElement, 'default-selection');
    }
  }

  onSubmit(index: number) {
    if (this.forms[index].valid && this.tasks != null) {
      const updatedTask = this.forms[index].value;
      this.taskService.editTask(index, updatedTask.task, updatedTask.priority);
      this.tasks[index] = { ...this.tasks[index], ...updatedTask };
      this.editIndex[index] = false;
      this.getSummaryItems();
    }
  }

  deleteTask(index: number) {
    this.editIndex[index] = false;
    this.taskService.deleteTask(index);
    this.loadTasks();
  }
}
