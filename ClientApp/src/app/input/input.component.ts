import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Output() addVideo: EventEmitter<string> = new EventEmitter();
  url = new FormControl('');

  constructor() {}

  ngOnInit() {}
}
