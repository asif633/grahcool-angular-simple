import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  
  title: string;
  start: string;
  @Output() submitMe = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  submit(){
    this.submitMe.emit({title: this.title, start: this.start});  
  }

}
