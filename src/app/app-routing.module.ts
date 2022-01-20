import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BXHComponent } from './screen/bxh/bxh.component';
import { DangkyComponent } from './screen/dangky/dangky.component';
import { GioithieuComponent } from './screen/gioithieu/gioithieu.component';
import { HighlightComponent } from './screen/highlight/highlight.component';
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

const routes: Routes = [
  {path: '',component: TrangChuComponent,pathMatch: 'full'}, 
  {path: 'soi-keo/:slug',component: SoikeoCTComponent},
  {path: 'soi-keo',component: SoikeoComponent},
  {path: 'bxh',component: BXHComponent},
  {path: 'ket-qua',component: KetquaComponent},
  {path: 'tin-tuc/:slug',component: TintucctComponent},
  {path: 'tin-tuc',component: TintucComponent},
  {path: 'lich-thi-dau',component: LichthidauComponent},
  {path: 'ty-le',component: TyleComponent},
  {path: 'livescore',component: LivescoreComponent},
  {path: 'highlight',component: HighlightComponent},
  {path: 'gioi-thieu',component: GioithieuComponent},
  {path: 'dang-ky',component: DangkyComponent},
  {path: 'truc-tiep/:slug',component: TructiepComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
