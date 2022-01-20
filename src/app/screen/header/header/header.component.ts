import { Component, OnInit } from '@angular/core';
import { FootballService } from 'src/app/football.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isExpanded = false;
  navItems: any[];
  constructor(private football: FootballService) {
    this.navItems = []
  }
  showDiv = {
    previous: false,
  };
  ngOnInit(): void {
    this.football.getNavItem(2)
            .toPromise()
            .then((data: any) => {
                this.navItems = data;
            });
  }
    collapse() {
      this.isExpanded = false;
      this.navItems = [];
  }

  toggle() {
      this.isExpanded = !this.isExpanded;
  }
}
