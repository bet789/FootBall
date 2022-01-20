import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-soikeo-ct',
  templateUrl: './soikeo-ct.component.html',
  styleUrls: ['./soikeo-ct.component.css']
})
export class SoikeoCTComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  private slug:any;
  public prediction: any;
  public relativePredictions: any[];
  public postTags: any[];
  constructor(private activatedRoute: ActivatedRoute,private football: FootballService,private sanitizer: DomSanitizer,private titleService: Title) {
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000);
        
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.slug = params.get('slug');
    });
    this.prediction = {};
    this.relativePredictions = [];
    this.postTags = [];
   }

  ngOnInit(): void {
    this.football.getPostDetail(this.slug)
      .toPromise()
      .then((data: any) => {
        this.prediction = data;
        this.titleService.setTitle(this.prediction.title);
      });

    this.football.getPagingPosts(10014, 1, 10, 2)
      .toPromise()
      .then((data: any) => {
        this.relativePredictions = data.items;
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
