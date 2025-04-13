import { Component, OnInit } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { SwiperModule } from 'swiper/angular';
import { CartaoService } from 'src/app/services/cartao.service';
import SwiperCore, { Navigation, Pagination, Scrollbar } from 'swiper';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';


SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [TagModule, SwiperModule, CommonModule]
})
export class HomeComponent implements OnInit {

  constructor(private cartaoService: CartaoService, private authService: AuthService){}
  nomeUsuario: any;
  cartoes: any[] = [];
  ngOnInit() {

    const usuarioString = this.authService.getUsuario();
    if(usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.nomeUsuario = usuario.nome;
    }

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