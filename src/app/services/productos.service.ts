import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Productos } from '../interfaces/productos.interface';
import { ProductoDescripcion } from '../interfaces/producto-descripcion.interface';


@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  cargando = true;
  Productos: Productos[] = [];
  productosFiltrado: Productos[] = [];


  constructor( private http: HttpClient) {

    this.cargarProductos();

  }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {

      this.http.get<Productos[]>('https://portfolio-udemy-853b2-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe ( (resp: Productos[]) => {

          this.Productos = resp;

          setTimeout( () => {
          this.cargando = false;
          }, 600);

          resolve( this.Productos );

        });

    });
  }

  getProducto ( id: string ) {

    return this.http.get<ProductoDescripcion>(`https://portfolio-udemy-853b2-default-rtdb.firebaseio.com/productos/${ id }.json`);
  }

  buscarProucto( termino: string ) {

    if ( this.Productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( ()=> {
        // ejecutar después de tener los productos
        // aplicar filtro
        this.filtrarProductos( termino );
      });
    } else {
      // aplicar filtro
        this.filtrarProductos( termino );
    }
  }

  private filtrarProductos( termino: string ) {

    // console.log(this.Productos);
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.Productos.forEach( prod => {

      const titulolower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino ) >= 0  || titulolower.indexOf ( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }

    });
  }

}
