import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-bxh',
  templateUrl: './bxh.component.html',
  styleUrls: ['./bxh.component.css']
})
export class BXHComponent implements OnInit {
    @BlockUI()
    blockUI!: NgBlockUI;
  public rankingData: any;
  public countries: any[]=[];
  public seasons: any[]=[];
  public leagues: any[]=[];
  public country= "";
  public league=0;
  public season= 0;
  constructor(private football: FootballService,private titleService: Title) {
    titleService.setTitle('Bảng xếp hạng bóng đá hôm nay');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000); 
    this.rankingData = { standings: [] };
        this.countries = [];
        this.seasons = [];
        this.leagues = [];
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
    this.football.getStandings(season, league)
        .toPromise()
        .then((data: any) => {
            if (data.response[0]) {
                this.rankingData = data.response[0].league;
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
}
