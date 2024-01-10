import { Component, Input } from '@angular/core';
import { InfoMessages } from '../../interfaces/info-messages';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.html',
  styleUrls: ['./info-message.css'],
})
export class InfoMessageComponent {
  @Input() infoMessages: InfoMessages = {};
  @Input() type: keyof typeof this.infoMessages = Object.keys(this.infoMessages)[0];

  getClass(): string {
    return this.type.toString() == '' ? 'hidden' : this.type.toString();
  }

  getMessage(): string {
    return this.infoMessages[this.type].message;
  }

  getIconClass(): string {
    return this.infoMessages[this.type].icon;
  }
}
