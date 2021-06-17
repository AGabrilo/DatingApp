import { Component, OnInit } from '@angular/core';
import { Member } from '../_models/member';
import { Pagination } from '../_models/pagination';
import { Rating } from '../_models/rating';
import { User } from '../_models/user';
import { UserParams } from '../_models/userParams';
import { MembersService } from '../_services/members.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  members: Member[];
  ratings: Partial<Rating[]>;
  rat: Partial<Rating[]>;
  rateV:Number[];
  user: User;
  searchText = '';
  searchRate;
  pageNumber=1;
  pageSize=8;
  pagination: Pagination;

  constructor(private memberService: MembersService) { }
  

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(){
    this.memberService.getM().subscribe(memb => {
       this.members=memb;
    })
  }
  

}
