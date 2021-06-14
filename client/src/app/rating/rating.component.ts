import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { Rating } from '../_models/rating';
import { User } from '../_models/user';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  ratings: Partial<Member[]>;
  pageNumber=1;
  pageSize=5;
  pagination: Pagination;

  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadRatings();
  }
  loadRatings(){
    this.memberService.getRate().subscribe(rate => {
      this.ratings=rate;
    })
  }

  // loadRatings(){
  //   this.memberService.getR(this.predicate,this.pageNumber,this.pageSize).subscribe(response => {
  //     this.ratings= response.result;
  //     this.pagination=response.pagination;
  //   })
  // }

}
