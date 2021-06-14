import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.css']
})
export class RegisterModalComponent implements OnInit {
   
  @Output() cancelRegister= new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[]=[];

  constructor(private accountService: AccountService,private toastr:ToastrService, private fb: FormBuilder, private router: Router,public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.initializeForm();
  this.maxDate= new Date();
  this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }
  initializeForm(){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]]

    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
    }
  }

  register(){
   this.accountService.register(this.registerForm.value).subscribe(response=>{
     this.router.navigateByUrl('/members');
   },error=>{
     this.validationErrors=error;
   })
   this.bsModalRef.hide();
  }

  cancel(){
    this.cancelRegister.emit(false);
  }

}
