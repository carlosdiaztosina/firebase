import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibroService } from '../services/libro.service';
import Swal from 'sweetalert';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  libros: any[]=[];


  constructor(private router: Router, private _libroService: LibroService) { }

  ngOnInit(): void {
    this.getLibros();
  }
  
  getLibros(){
    this._libroService.getLibros().subscribe(data =>{
      this.libros=[];
      data.forEach((element:any) => {
        this.libros.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }


  onSelect(book: { id: any; }){
    this.router.navigate(['/indexcard', book.id]);
  }
  remove(id: string){
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
        this._libroService.eliminarLibro(id).then(()=>{
          console.log('autor eliminado correctamente')
        }).catch(error=>{
          console.log(error);
        });
      } else {
        Swal("No se ha eliminado al autor");
      }
    })
  }

}
