import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BannerComponent } from './screen/banner/banner.component';
import { BXHComponent } from './screen/bxh/bxh.component';
import { DangkyComponent } from './screen/dangky/dangky.component';
import { FooterComponent } from './screen/footer/footer/footer.component';
import { GioithieuComponent } from './screen/gioithieu/gioithieu.component';
import { HeaderComponent } from './screen/header/header/header.component';
import { HighlightComponent } from './screen/highlight/highlight.component';
import { HlvideoComponent } from './screen/hlvideo/hlvideo.component';
import { KetquaComponent } from './screen/ketqua/ketqua.component';
import { LichthidauComponent } from './screen/lichthidau/lichthidau.component';
import { LivescoreComponent } from './screen/livescore/livescore.component';
import { SoikeoCTComponent } from './screen/soikeo/soikeo-ct/soikeo-ct.component';
import { SoikeoComponent } from './screen/soikeo/soikeo.component';
import { TintucComponent } from './screen/tintuc/tintuc.component';
import { TintucctComponent } from './screen/tintuc/tintucct/tintucct.component';
import { TrangChuComponent } from './screen/trang-chu/trang-chu.component';
import { TructiepComponent } from './screen/tructiep/tructiep.component';
import { TyleComponent } from './screen/tyle/tyle.component';

@NgModule({
  declarations: [
    AppComponent,
    TrangChuComponent,
    FooterComponent,
    HeaderComponent,
    SoikeoComponent,
    BXHComponent,
    KetquaComponent,
    TintucComponent,
    LichthidauComponent,
    TyleComponent,
    LivescoreComponent,
    HighlightComponent,
    GioithieuComponent,
    DangkyComponent,
    SoikeoCTComponent,
    TintucctComponent,
    BannerComponent,
    HlvideoComponent,
    TructiepComponent
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'FootBallAPI' }),//angular-starter / serverApp
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    NgxPaginationModule,
    FormsModule,  
    ReactiveFormsModule,
    BlockUIModule.forRoot({
      delayStop: 500,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
