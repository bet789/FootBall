import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gioithieu',
  templateUrl: './gioithieu.component.html',
  styleUrls: ['./gioithieu.component.css']
})
export class GioithieuComponent implements OnInit {

  constructor(private titleService: Title) { 
    titleService.setTitle('Giới thiệu');
  }

  ngOnInit(): void {
  }

}
