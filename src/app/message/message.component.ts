import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../services.service';
import { Router } from '@angular/router';
import { LoaderService } from '../loader.service';
import { LogingService } from '../loging.service';
// import { userInfo } from 'os';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input() content: string = '';
  @Output() okClickEvent = new EventEmitter<boolean>();

  public okClick(){

  }
}
