import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  fecha = new Date();

producto: ProductoDescripcion = {
  categoria: '',
  desc1: '',
  desc2: '',
  producto: '',
  resumen: '',
  subtitulo1: '',
  subtitulo2: '',
}

id: string = '';

  constructor( private route: ActivatedRoute,
               public  productosService: ProductosService ) {}

  ngOnInit() {

    this.route.params
      .subscribe( parametros => {
        //console.log(parametros['id']);
        this.productosService.getProducto(parametros['id'])
            .subscribe ( (producto: ProductoDescripcion) => {
              this.id = parametros['id'];
              this.producto = producto;
              console.log(producto);

            });

      });

  }

}
