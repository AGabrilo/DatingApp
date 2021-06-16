import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { RatingModalComponent } from 'src/app/modals/rating-modal/rating-modal.component';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Rating } from 'src/app/_models/rating';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  ratings: Partial<Rating[]>;
  members: Partial<Member[]>;
  predicate='liked';
  memberss: Member []= [];
  username: string;
  pagination: Pagination;
  pageNumber=1;
  pageSize=20;
  ratingMode = false;
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService,private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadRatings();
  }

  addLike(member: Member){
    this.memberService.addLike(member.username).subscribe(()=>{
      this.toastr.success('You have liked '+ member.knownAs);
    })
  }
  loadRatings(){
    this.memberService.getRate().subscribe(rate => {
      this.ratings=rate;
    })
  }
  
  getRatingSum=function(r:number[]){
    var tot=0;
    var count=0;
    for (var i = 0; i < r.length; i++) {
      tot += r[i]
      count++;
    }
    if(tot==0)
    return tot;
      return tot/count;
  }
  openRatingModal() {

    this.bsModalRef = this.modalService.show(RatingModalComponent);

  }

}
