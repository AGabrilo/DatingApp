import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-rating-modal',
  templateUrl: './rating-modal.component.html',
  styleUrls: ['./rating-modal.component.css']
})
export class RatingModalComponent implements OnInit {
  member: Member;
  max = 5;
  rate = 0;
  isReadonly = false;
  ratingValue: number;
  username: string;
  

  overStar: number | undefined;
  percent: number;

  constructor(private toastr: ToastrService,private memberService: MembersService,public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  hoveringOver(value: number): void {
    this.overStar = value;
  }
 
  resetStar(): void {
    this.overStar = void 0;
  }
   addRating(member: Member,rate: number) {
    this.ratingValue=rate;
    console.log(this.ratingValue);
    this.memberService.addRating(member.username,this.ratingValue).subscribe(() => {
      this.toastr.success('You have rated ' + member.knownAs);
    })
  }
}
