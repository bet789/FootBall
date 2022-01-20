import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-trang-chu',
  templateUrl: './trang-chu.component.html',
  styleUrls: ['./trang-chu.component.css']
})
export class TrangChuComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  datat = [
    { link:'https://www.jun82.com/?uagt=bongda88&path=signup',image:'https://cdn.jun23.com/Upload/Untitled-54513.png' },
    { link:'https://www.jun82.com/?uagt=bongda88&path=signup',image:'https://cdn.jun23.com/Upload/789banerweb.png' },
    { link:'https://www.jun82.com/?uagt=bongda88&path=signup',image:'https://cdn.jun23.com/Upload/banerjun88web (2).png' },
    { link:'https://www.shbet0.com/?uagt=truyenthong&path=signup',image:'https://cdn.jun23.com/Upload/bannercdsc (3).png' },
  ];
  // ************************************************************
  public datas:any[] = [];
  //public dataLG:any[] = [];

// ************************************************************
  public newses:any[] = [];
  public page = 1;
  public pageSize = 6;
// ************************************************************
  public pages = 1;
  public pageSizes = 9;
  public predictions:any[] = [];
// ************************************************************
  public val = 4
  //datas = [] as any;
  constructor(private football: FootballService) { 
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 500); 
    this.loaddt()
  }
  check = true
  loaddt(){
    this.datas=[]
      this.football.getNextFixtures(4,0).toPromise().then((data: any) => {
        this.datas = this.datas.concat(data.response);       
    });
    this.check=true
    this.val=4
  }
  
  getNextFixture()
  {  
    if(this.check)
    {
        this.datas=[]
        this.val = this.val+4
        this.football.getNextFixtures(this.val,0).toPromise().then((data: any) => {
          this.datas = this.datas.concat(data.response);       
      });  
    }  
  }
  getFixtures(){
    this.check=false
      this.datas=[]
      this.football.getFixturesInProgress().toPromise().then((data: any) => {
        this.datas = this.datas.concat(data.response);       
    });
    this.val=4
  }
  getFixturesTomorrow(){
    this.check=false
    this.datas=[]
    let date = new Date();
    let day = (date.getDate()+1).toString();
    let month = (date.getMonth()+1).toString();
    
    if(day.length<2)
      day = "0"+day
    if(month.length<2)
      month = "0"+month
    let strdate = date.getFullYear() + "-" + month + "-" + day
    this.football.getFixturesByDate(strdate ,date.getFullYear()).toPromise().then((data: any) => {
      this.datas = this.datas.concat(data.response);       
  });
  this.val=4
}
  getDate(timestamp:any) {
      let date = new Date(timestamp * 1000);
      let hour = date.getHours().toString();
      if (hour.length < 2) {
          hour = '0' + hour;
      }
      let minute = date.getMinutes().toString();
      if (minute.length < 2) {
          minute = '0' + minute;
      }
      return hour + ':' + minute + ' - ' + date.getDate() + '/' + (date.getMonth() + 1);
  }

  ngOnInit(): void {
    this.loadData(10021, this.page, this.pageSize, 2);
    this.loadDatas(10014, this.pages, this.pageSizes, 2);

  }
  loadData(categoryId: number, pageIndex: number, pageSize: number, statusPost: number, keyword?: string) {
        this.football.getPagingPosts(categoryId, pageIndex, pageSize, statusPost, keyword)
            .toPromise()
            .then((data: any) => {
                this.newses = data.items;
            });
    }

  loadDatas(categoryId: number, pageIndex: number, pageSize: number, statusPost: number, keyword?: string){
      this.football.getPagingPosts(categoryId, pageIndex, pageSize, statusPost, keyword)
          .toPromise()
          .then((data: any) => {
              this.predictions = data.items;
          });
  }
  //-------------------------------------------------------------------
  regexString(str: string) {
      return str.replace(/\s/g, "-").toLowerCase();
  }
  getDateForRoute(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hour = date.getHours().toString();
    if (hour.length < 2) {
        hour = '0' + hour;
    }
    let minute = date.getMinutes().toString();
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    let month = date.getMonth() + 1;
    return `${hour}-${minute}-ngay-${date.getDate()}-${month}-${date.getFullYear()}`
}
}
