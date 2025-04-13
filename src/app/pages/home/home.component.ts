import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { SwiperModule } from 'swiper/angular';
import { CartaoService } from 'src/app/services/cartao.service';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { CommonModule } from '@angular/common';


SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TagModule, SwiperModule, CommonModule]
})
export class HomeComponent implements OnInit {

  constructor(private cartaoService: CartaoService){}

  cartoes: any[] = [];
  ngOnInit() {
   this.cartaoService.getCartoesUsuario().subscribe((data) => {
     this.cartoes = data;
   })
 }

  onSwiper(swiper: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }

  getStatus(status: boolean) {
    return status ? 'success' : 'danger';
  }

}