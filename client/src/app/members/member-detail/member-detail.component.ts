import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { Photo } from 'src/app/_models/photo';
import { MembersService } from 'src/app/_services/members.service';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { ToastrService } from 'ngx-toastr';
import { Rating } from 'src/app/_models/rating';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  activeTab: TabDirective;
  messages: Message[] = [];
  max = 5;
  rate = 0;
  isReadonly = false;
  ratingValue: number;
  username: string;
  IsRatedByUser=0;
  ratings: Partial<Rating>;
  

  overStar: number | undefined;
  percent: number;


  constructor(private memberService: MembersService,private toastr: ToastrService,private route: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member=data.member;
    })
    this.route.queryParams.subscribe(params=> {
      params.tab ? this.selectTab(params.tab) : this.selectTab(0);
    })

    this.galleryOptions=[
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
    this.galleryImages=this.getImages();
    this.loadRatingStatus();
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrls;
  }

  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }

  selectTab(tabId: number) {
    this.memberTabs.tabs[tabId].active = true;
  }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      this.loadMessages();
    }
  }

  hoveringOver(value: number): void {
    this.overStar = value;
  }
 
  resetStar(): void {
    this.overStar = void 0;
  }
   addRating(member: Member,rate: number) {
    this.IsRatedByUser=1;
    this.ratingValue=rate;
    console.log(this.ratingValue);
    this.memberService.addRating(member.username,this.ratingValue).subscribe(() => {
      this.toastr.success('You have rated ' + member.knownAs);
    })
  }
    loadRatingStatus(){ 
    this.memberService.getRatingStatus(this.member.username).subscribe(r => { 
      this.ratings = r; 
      console.log(this.ratings)
    }) 

  } 

}