import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.css']
})
export class HighlightComponent implements OnInit {
  @BlockUI()
  blockUI!: NgBlockUI;
  constructor(private titleService: Title) {
    titleService.setTitle('Highlight bóng đá hôm qua – Xem lại video trận đấu mới nhất');
    this.blockUI.start('Loading...');
        setTimeout(() => {
            this.blockUI.stop();
        }, 500); 
   }

  ngOnInit(): void {
  }

}
