import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-ketqua',
  templateUrl: './ketqua.component.html',
  styleUrls: ['./ketqua.component.css']
})
export class KetquaComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  public scoreData: any[]=[];
  public countries: any[]=[];
  public seasons: any[]=[];
  public leagues: any[]=[];
  public country= "";
  public league= 0;
  public season= 0;
  constructor(private football: FootballService,private titleService: Title) {
    titleService.setTitle('Kết quả bóng đá hôm nay');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000); 
    this.season = new Date().getFullYear();
    this.league = 39;
    this.country = 'England'
   }

  ngOnInit(): void {
    //get all seasons
      this.football.getAllSeasons()
      .toPromise()
      .then((data: any) => {
          this.seasons = data.response.sort((a:any, b:any) => 0 - (a > b ? 1 : -1));
      });
    //get all countries
    this.football.getAllCountries()
        .toPromise()
        .then((data: any) => {
            this.countries = data.response;
        })

    this.getLeagues(this.season, this.country);
    this.loadData(this.season, this.league);
  }
  loadData(season:any, league:any) {
    this.scoreData = [];
      this.football.getFixtures(season, league)
          .toPromise()
          .then((data: any) => {
              if (data.response) {
                data.response.forEach((element:any) => {
                  if (element.goals.home != null) {
                    this.scoreData.push(element);
                  }
                })
                this.scoreData.sort((a, b) => <any>new Date(b.fixture.date) - <any>new Date(a.fixture.date));
              }
          })
  }

  getLeagues(season:any, country:any) {
      this.football.getLeagues(season, country)
          .toPromise()
          .then((data: any) => {
              this.leagues = data.response
          });
  }

  onSeasonChange(season:any) {
      this.getLeagues(season, this.country);
      this.loadData(season, this.league);
  }

  onCountryChange(country:any) {
      this.getLeagues(this.season, country);
      this.loadData(this.season, this.league);
  }

  onLeagueChange(league:any) {
      this.loadData(this.season, league);
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
