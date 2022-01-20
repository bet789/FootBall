import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-lichthidau',
  templateUrl: './lichthidau.component.html',
  styleUrls: ['./lichthidau.component.css']
})
export class LichthidauComponent implements OnInit {
    @BlockUI()
    blockUI!: NgBlockUI;
  public scheduleData: any[]=[];
  public countries: any[]=[];
  public seasons: any[]=[];
  public leagues: any[]=[];
  public country= "England";
  public league= 39;
  public season= new Date().getFullYear();
  public next= 50;


  listDataLeagues = [
      {
          "id": 1,
          "league": "World cup",
          "country": "World"
      },
      {
          "id": 2,
          "league": "UEFA Champions League",
          "country": "World"
      },
      {
          "id": 3,
          "league": "UEFA Europa League",
          "country": "World"
      },
      {
          "id": 4,
          "league": "Euro Championship",
          "country": "World"
      },
      {
          "id": 5,
          "league": "UEFA Nations League",
          "country": "World"
      },
      {
          "id": 9,
          "league": "Copa America",
          "country": "World"
      },
      {
          "id": 39,
          "league": "Premier League",
          "country": "England"
      },
      {
          "id": 544,
          "league": "FA Cup",
          "country": "England"
      },
      {
          "id": 871,
          "league": "Premier League Cup",
          "country": "England"
      },
      {
          "id": 135,
          "league": "Serie A",
          "country": "Italy"
      },
      {
          "id": 137,
          "league": "Coppa Italia",
          "country": "Italy"
      },
      {
          "id": 140,
          "league": "La Liga",
          "country": "Spain"
      },
      {
          "id": 143,
          "league": "Copa del Rey",
          "country": "Spain"
      },
      {
          "id": 78,
          "league": "Bundesliga 1",
          "country": "Germany"
      },
      {
          "id": 529,
          "league": "Super Cup",
          "country": "Germany"
      },
      {
          "id": 81,
          "league": "DFB Pokal",
          "country": "Germany"
      },
      {
          "id": 61,
          "league": "Ligue 1",
          "country": "France"
      },
      {
          "id": 66,
          "league": "Coupe de France",
          "country": "France"
      },
      {
          "id": 17,
          "league": "AFC Champions League",
          "country": "World"
      },
      {
          "id": 18,
          "league": "AFC Cup",
          "country": "World"
      },
      {
          "id": 340,
          "league": "V.League 1",
          "country": "Vietnam"
      },
      {
          "id": 637,
          "league": "V.League 2",
          "country": "Vietnam"
      },
      {
          "id": 341,
          "league": "Cup",
          "country": "Vietnam"
      },
      {
          "id": 531,
          "league": "UEFA Super Cup",
          "country": "World"
      },
      {
          "id": 848,
          "league": "UEFA Europa Conference League",
          "country": "World"
      }
  ];
  constructor(private football: FootballService,private titleService: Title) {
    titleService.setTitle('Lịch thi đấu bóng đá hôm nay');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 2000); 
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
    this.loadData(this.next, this.league);
  }
    loadData(next: number, league?: number) {
      this.football.getNextFixtures(next, league)
          .toPromise()
          .then((data: any) => {
              this.scheduleData = data.response;
          });
  }

    getLeagues(season:any, country:any) {
        this.football.getLeagues(season, country)
            .toPromise()
            .then((data: any) => {
                this.leagues = data.response;
            });
    }

    onSeasonChange(season:any) {
        this.getLeagues(season, this.country);
    }

    onCountryChange(country:any) {
        this.getLeagues(this.season, country);
        this.loadData(this.next, this.league);
    }

    onLeagueChange(league:any) {
        this.loadData(this.next, league);
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
