import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegisterModalComponent } from '../modals/register-modal/register-modal.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  registerMode = false;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  
  registerToggle(){
    this.registerMode=!this.registerMode;
  }

  cancelRegisterMode(event:boolean){
 this.registerMode= event;
  }
  openRegisterModal() {

    this.bsModalRef = this.modalService.show(RegisterModalComponent);

  }

}
