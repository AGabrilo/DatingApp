import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  members: Partial<Member[]>;
  predicate='liked';
  memberss: Member []= [];
  username: string;
  pagination: Pagination;
  pageNumber=1;
  pageSize=20;

  constructor(private memberService: MembersService, private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.loadRatings();
  }

  addLike(member: Member){
    this.memberService.addLike(member.username).subscribe(()=>{
      this.toastr.success('You have liked '+ member.knownAs);
    })
  }

  // loadRatings(){
  //   this.memberService.getRate(this.predicate,this.pageNumber,this.pageSize).subscribe(response => {
  //     this.members= response.result;
  //     this.pagination=response.pagination;
  //   })
  // }

  

  // loadRatings(){
  //   console.log(this.member.username);
  //   this.memberService.getRatings(this.member.username).subscribe(member => {
  //     this.member=member;
  //   })
  // }

}
