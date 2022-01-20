import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-livescore',
  templateUrl: './livescore.component.html',
  styleUrls: ['./livescore.component.css']
})
export class LivescoreComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  public liveScoreData: any[]=[];
  constructor(private football: FootballService, private titleService: Title) {
    titleService.setTitle('Livescore bóng đá nhanh nhất - Tỷ số trực tuyến chuyendongsanco.com');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000); 
   }

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.football.getFixturesInProgress()
        .toPromise()
        .then((data: any) => {
            this.liveScoreData = data.response;
            this.getMoreData(30);
        })
}

getMoreData(next: number) {
    this.football.getNextFixtures(next)
        .toPromise()
        .then((data: any) => {
            this.liveScoreData = this.liveScoreData.concat(data.response);
        });
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
}
