import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FootballService } from 'src/app/football.service';

@Component({
  selector: 'app-soikeo',
  templateUrl: './soikeo.component.html',
  styleUrls: ['./soikeo.component.css']
})
export class SoikeoComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  constructor(private football: FootballService,private titleService : Title) { 
    titleService.setTitle('Soi kèo bóng đá hôm nay')
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000);
  }
  public page = 1;
  public pageSize = 12;
  public totalRecords = 0;
  public predictions: any[] = [];
  ngOnInit(): void {
    this.loadData(10014, this.page, this.pageSize, 2);
  }
  loadData(categoryId: number, pageIndex: number, pageSize: number, statusPost: number, keyword?: string){
      this.football.getPagingPosts(categoryId, pageIndex, pageSize, statusPost, keyword)
          .toPromise()
          .then((data: any) => {
              this.predictions = data.items;
              this.totalRecords = data.totalRecords;
          });
  }
  onPageChange(page:number) {
    this.page = page;
    this.loadData(10014, this.page, this.pageSize, 2);
  }
  // p: number = 1;
  // collection: any[] = someArrayOfThings;  
}
