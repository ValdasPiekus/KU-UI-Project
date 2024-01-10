import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Inputs } from 'src/app/shared/interfaces/inputs';
import { inputs } from '../../constants/inputs';
import { Priority } from '../../interfaces/priorities';
import { priorities } from '../../constants/priorities';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { HeaderItem } from 'src/app/shared/interfaces/header-items';
import { headerItems } from '../../constants/header-items';
import { InfoMessages } from 'src/app/shared/interfaces/info-messages';
import { infoMessages } from '../../constants/info-messages';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.html',
  styleUrls: ['./new-task.css'],
})
export class NewTaskComponent {
  headerItems: HeaderItem[] = headerItems;
  inputs: Inputs = inputs;
  priorities: Priority[] = priorities;
  form: FormGroup;
  infoMessage?: string;
  infoMessages: InfoMessages = infoMessages;
  @ViewChild('prioritySelect') prioritySelect!: ElementRef;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2
  ) {
    this.form = this.formBuilder.group({
      task: ['', Validators.required],
      priority: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => (this.infoMessage = ''));
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

  onSubmit() {
    const formData = this.form.value;
    if (this.form.valid) {
      this.taskService.createTask(formData.task, formData.priority);
      this.form.reset({
        priority: '',
      });
      this.renderer.addClass(this.prioritySelect.nativeElement, 'default-selection');
      this.infoMessage = 'success';
    }
  }
}
