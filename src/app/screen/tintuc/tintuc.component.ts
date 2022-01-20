import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-tintuc',
  templateUrl: './tintuc.component.html',
  styleUrls: ['./tintuc.component.css']
})
export class TintucComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  public newses: any[]=[];
  public page = 1;
  public pageSize = 12;
  public totalRecords = 0;
  constructor(private football: FootballService,private titleService: Title) {
    titleService.setTitle('Tin tức thể thao hôm nay');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000); 
   }

  ngOnInit(): void {
    this.loadData(10021, this.page, this.pageSize, 2);
  }
  loadData(categoryId: number, pageIndex: number, pageSize: number, statusPost: number, keyword?: string) {
      this.football.getPagingPosts(categoryId, pageIndex, pageSize, statusPost, keyword)
          .toPromise()
          .then((data: any) => {
              this.newses = data.items;
              this.totalRecords = data.totalRecords;
          });
  }

  onPageChange(page:any) {
      this.page = page;
      this.loadData(10021, this.page, this.pageSize, 2);
  }
}
