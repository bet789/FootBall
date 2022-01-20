import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FootballService } from 'src/app/football.service';
// import flvjs from 'flv.js';
@Component({
  selector: 'app-tructiep',
  templateUrl: './tructiep.component.html',
  styleUrls: ['./tructiep.component.css']
})
export class TructiepComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  private fixture: any;
  private interval: any;
  private h2hId: string='';
  public match: any;
  public liveStreamSources: string='';
  public isFlvSupported: boolean = true;
  public stream: string='';
  public h2h: any[];
  public homeFixtures: any[];
  public awayFixtures: any[];
  public roomId: number =0;
  public leftBanners: any[];
  public rightBanners: any[];

  private slug: string='';
  constructor(private activatedRoute: ActivatedRoute,private router: Router, private football: FootballService) { 
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000);
        this.match = {};
        let state = this.router.getCurrentNavigation()?.extras.state;
        if (state) {
            this.fixture = state;
            this.stream = this.fixture.fixtureId; //tên stream đặt trùng với id của fixture
            this.roomId = this.fixture.fixtureId; //chat room id
            this.h2hId = this.fixture.home + '-' + this.fixture.away;
        }
        else {
            this.slug = activatedRoute.snapshot.paramMap.get('slug')!;
            this.football.getCastingBySlug(this.slug)
                .toPromise()
                .then((data: any) => {
                    if (data) {
                        this.fixture = data;
                        this.stream = this.fixture.fixtureId; //tên stream đặt trùng với id của fixture
                        this.roomId = this.fixture.fixtureId; //chat room id
                        this.h2hId = this.fixture.h2H;
                        let splitedH2H = this.fixture.h2H.split('-');
                        this.fixture.home = splitedH2H[0];
                        this.fixture.away = splitedH2H[1];
                    }
                    else {
                        this.router.navigateByUrl('');
                    }
                });
        }
        this.h2h = [];
        this.homeFixtures = [];
        this.awayFixtures = [];
        this.leftBanners = [];
        this.rightBanners = [];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loadData();
      //get fixtures between 2 teams
      this.football.getFixturesH2H(this.h2hId)
          .toPromise()
          .then((data: any) => {
              this.h2h = data.response.sort((a: { fixture: { timestamp: number; }; }, b: { fixture: { timestamp: number; }; }) => (a.fixture.timestamp > b.fixture.timestamp ? -1 : 1));
          });

      //get fixtures by team
      this.football.getFixturesByTeamId(this.fixture.home, new Date().getFullYear())
          .toPromise()
          .then((data: any) => {
              this.homeFixtures = data.response;
          });
      this.football.getFixturesByTeamId(this.fixture.away, new Date().getFullYear())
          .toPromise()
          .then((data: any) => {
              this.awayFixtures = data.response
          });
  }, 1000)

  this.interval = setInterval(() => {
      this.loadData();
  }, 60000);

  // if (!flvjs.isSupported()) {
  //     this.isFlvSupported = false;
  //     this.football.getStreamStats()
  //         .toPromise()
  //         .then((value:any) => {
  //             if (value["live"]) {
  //                 this.liveStreamSources = `https://chuyendongsanco.online/live/${this.stream}/index.m3u8`;
  //             }
  //             else {
  //                 this.liveStreamSources = '';
  //             }
  //         });
  // }

  this.football.getLiveBanner('live-left')
      .toPromise()
      .then((data: any) => {
          this.leftBanners = data;
      });

  this.football.getLiveBanner('live-right')
      .toPromise()
      .then((data: any) => {
          this.rightBanners = data;
      });
  }


  ngOnDestroy() {
    clearInterval(this.interval);
}

loadData() {
    if (this.fixture) {
        this.football.getFixtureById(this.fixture.fixtureId)
            .toPromise()
            .then((data: any) => {
                if (data.response) {
                    this.match = data.response[0];
                }
            });
    }
}

getDate(timestamp: number) {
    let date = new Date(timestamp * 1000);
    let hour = date.getHours().toString();
    if (hour.length < 2) {
        hour = '0' + hour;
    }
    let minute = date.getMinutes().toString();
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    return hour + ':' + minute + ' - ' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
}

}
