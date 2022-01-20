import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/football.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public topBanners: any[];
    public leftBanners: any[];
    public rightBanners: any[];
    public isLeftShow = false;
    public isRightShow = false;
  constructor(private football: FootballService) {
    this.topBanners = [];
        this.leftBanners = [];
        this.rightBanners = [];
   }

  ngOnInit(): void {
    this.football.getBannersByPostion('top')
            .toPromise()
            .then((data: any) => {
                this.topBanners = data;
            });

            this.football.getBannersByPostion('left')
            .toPromise()
            .then((data: any) => {
                this.leftBanners = data
            });

            this.football.getBannersByPostion('right')
            .toPromise()
            .then((data: any) => {
                this.rightBanners = data
            });
  }
  hideBanner(side: string) {
    if (side === 'left') {
        this.isLeftShow = true;
    }
    else if (side === 'right') {
        this.isRightShow = true;
    }
}

}
