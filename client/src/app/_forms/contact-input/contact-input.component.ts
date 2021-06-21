import { Component, Input, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-contact-input',
  templateUrl: './contact-input.component.html',
  styleUrls: ['./contact-input.component.css']
})
export class ContactInputComponent implements OnInit {
  @Input() label: string;
  @Input() type: 'text';

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor=this;
   }

  ngOnInit(): void {
  }
  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

}
