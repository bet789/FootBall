import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FootballService } from 'src/app/football.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-tyle',
  templateUrl: './tyle.component.html',
  styleUrls: ['./tyle.component.css']
})
export class TyleComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  public bookmakers: any[]=[];
  public odds: any[]=[];
  public page=1;
  public total=0;
  public bookmaker =1;
  constructor(private football: FootballService,private titleService: Title) {
    titleService.setTitle('Tỷ lệ kèo nhà cái');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 500); 
   }

  ngOnInit(): void {
    this.football.getALlBookmaker()
            .toPromise()
            .then((data: any) => {
                this.bookmakers = data.response;
            });
        this.loadData();
  }
  loadData() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    if (month.length < 2) {
        month = '0' + month;
    }
    let strDate = date.getFullYear() + '-' + month + '-' + date.getDate();

    this.football.getOddsByDate(strDate, this.page, this.bookmaker)
        .toPromise()
        .then((data: any) => {
            this.odds = data.response;
            this.total = data.paging.total;

            this.odds.forEach(odd => {
                this.football.getFixtureById(odd.fixture.id)
                    .toPromise()
                    .then((data: any) => {
                    var tb=document.getElementById(odd.fixture.id)!
                    var aa=   '<p>' + this.getDate(data.response[0].fixture.timestamp) + '</p>' +
                                '<h5>' + data.response[0].teams.home.name +
                                ' <span class="text-success">vs</span> ' +
                                data.response[0].teams.away.name + '</h5>' +
                                '<p>(' + data.response[0].fixture.status.long + ')</p>';
                    tb.innerHTML=aa
                    });
            });
        });
}

changeBookmaker(id: number) {
    this.bookmaker = id;
    this.loadData();
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
    return hour + ':' + minute + ' - ' + date.getDate() + '/' + (date.getMonth() + 1);
}

onPageChange(page: any) {
    this.page = page;
    this.loadData();
}
}
