import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  ref: string | null;
  libros: any[] = [];
  autores: any[] = [];
  modal = false;


  public bookId: number | undefined;
  public bookAutor: string | undefined;
  public autorImg: string | undefined;
  list = [] as any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _libroService: LibroService) {
    this.ref = this.route.snapshot.paramMap.get('idAutor');
    console.log(this.ref);
  }

  ngOnInit(): void {

    if (window.location.pathname != '/authors') {
      this.autorSelect();
      this.getLibros();
    } else {
      this.getAutores();
    }
  }

  autorSelect() {
    if (this.ref !== null) {
      this._libroService.getAutor(this.ref).subscribe(data => {
        console.log(data.payload.data());
        this.bookAutor = data.payload.data()['nombre'];
        this.autorImg = data.payload.data()['imagen'];
      })
    }
  }

  getAutores() {
    this._libroService.getAutores().subscribe(data => {
      this.autores = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id)
        // console.log(element.payload.doc.data())
        this.autores.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.autores)
    });
  }

  getLibros() {
    this._libroService.getLibroByAutor(this.route.snapshot.params['idAutor']).subscribe(data => {
      this.libros = [];
      data.forEach((element: any) => {
        // console.log(element.payload.doc.id)
        // console.log(element.payload.doc.data())
        this.libros.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
      console.log(this.libros)
    });
  }

  onSelect(autor: { id: any; }) {
    this.router.navigate(['/authors', autor.id]);
  }
  modalMetodo(id: string) {
    Swal({
      title: "¿Quiere eliminar un autor?",
      text: "Una vez eliminado, no lo podrá recuperar.",
      icon: "warning",
      buttons: ["No", true],
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        Swal("Se ha eliminado al autor", {
          icon: "success",
        });
        this._libroService.eliminarAutor(id).then(()=>{
          console.log('autor eliminado correctamente')
        }).catch(error=>{
          console.log('error');
        })
      } else {
        Swal("No se ha eliminado al autor");
      }
    })
  }
}
