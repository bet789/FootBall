import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-tintucct',
  templateUrl: './tintucct.component.html',
  styleUrls: ['./tintucct.component.css']
})
export class TintucctComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  private slug: any;
  public news: any;
  public relativeNewses: any[];
  public postTags: any[];
  constructor(private activatedRoute: ActivatedRoute,private football: FootballService,private sanitizer: DomSanitizer,private titleService: Title) {
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000); 

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get("slug");
    });
    this.news = {};
    this.relativeNewses = [];
    this.postTags = [];
   }

  ngOnInit(): void {
    this.football
      .getPostDetail(this.slug)
      .toPromise()
      .then((data: any) => {
        this.news = data;
        this.titleService.setTitle(this.news.title);
      });

    this.football
      .getPagingPosts(10021, 1, 10, 2)
      .toPromise()
      .then((data: any) => {
        this.relativeNewses = data.items;
      });

    this.football.getPostTags(66, 2)
      .toPromise()
      .then((data: any) => {
        this.postTags = data;
      });
  }
  getShortCode(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
