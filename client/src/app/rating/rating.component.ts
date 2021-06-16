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
  ratings: Partial<Rating[]>;
  
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadRatings();
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

}
