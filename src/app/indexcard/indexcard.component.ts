import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-indexcard',
  templateUrl: './indexcard.component.html',
  styleUrls: ['./indexcard.component.css']
})
export class IndexcardComponent implements OnInit {
  ref : string| null;

  public bookId: number | undefined;
  public bookIdAutor: number | undefined;
  public bookNombre: string | undefined;
  public bookAutor: string | undefined;
  public bookImg : string | undefined;

  constructor(private route: ActivatedRoute, 
              private router:Router, 
              private _libroService: LibroService) {
    this.ref = this.route.snapshot.paramMap.get('id');
  }
  
  ngOnInit(): void {
    this.libroSelect();
  }
  
  libroSelect(){
    if(this.ref !== null){
      this._libroService.getLibro(this.ref).subscribe(data =>{
        this.getAutor(data.payload.data()['idAutor']);
        this.bookId = data.payload.id;
        this.bookNombre = data.payload.data()['nombre'];
        this.bookImg = data.payload.data()['imagen'];
        this.bookIdAutor= data.payload.data()['idAutor'];
      })
    }
  }
  getAutor(id: string){
    this._libroService.getAutor(id).subscribe(data=>{
      this.bookAutor = data.payload.data()['nombre'];
    })
  }

  onSelect(id: any){
    this.router.navigate(['/authors', id]);
  }

}
