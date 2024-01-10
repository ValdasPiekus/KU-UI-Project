import { Component, Input } from '@angular/core';
import { SummaryItem } from '../../interfaces/summary-items';

@Component({
  selector: 'app-task-summary',
  templateUrl: './task-summary.html',
  styleUrls: ['./task-summary.css'],
})
export class TaskSummaryComponent {
  @Input() summaryItems: SummaryItem[] = [];
}
