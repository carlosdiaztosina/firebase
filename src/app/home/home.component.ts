import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibroService } from '../services/libro.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  libros: any[]=[];
  autores: any[]=[];

  ref : string| null;

  createLibro: FormGroup;
  createAutor: FormGroup;

  submit = false;

  // public nombre : string | any;
  // public autor : string | any;
  // public img : string | any;

  constructor(private route : ActivatedRoute, private fb: FormBuilder, private _libroSercive: LibroService){ 
    this.createLibro = this.fb.group({
      nombre:['',Validators.required],
      autor:['',Validators.required],
      imagen:['',Validators.required]
    });
    this.createAutor = this.fb.group({
      autorNuevo:['',Validators.required],
      autorImagen:['',Validators.required]
    });

    this.ref = this.route.snapshot.paramMap.get('id');
    console.log(this.ref);
  }

  ngOnInit(): void {
    if(this.ref !== null){
      this.esEditar();
    }else{
      this.getLibros();
      this.getAutores();
    }
  }
  getLibros(){

    this._libroSercive.getLibros().subscribe(data =>{
      this.libros=[];
      data.forEach((element:any) => {
        this.libros.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  getAutores(){
    this._libroSercive.getAutores().subscribe(data =>{
      this.autores=[];
      data.forEach((element:any) => {
        this.autores.push({
          id:element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  esEditarAgregar(){
    this.submit = true;
    if(this.ref === null){
      this.agregarLibro();
    }else{
      this.editarLibro(this.ref );
    }
  }

  agregarLibro(){
    console.log(this.createLibro)
    const libro: any ={
      idUnico:this.libros.length + 1,
      nombre:this.createLibro.value.nombre,
      idAutor:this.createLibro.value.autor,
      imagen:this.createLibro.value.imagen,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    this._libroSercive.agregarLibro(libro).then(()=>{
      console.log('libro añadido!');
      location.href ="/books";
    }).catch(error=>{
      console.log(error);
    })
  }

  agregarAutor(){
    const autor: any ={
      idUnico:this.autores.length + 1,
      nombre:this.createAutor.value.autorNuevo,
      imagen:this.createAutor.value.autorImagen,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }

    this._libroSercive.agregarAutor(autor).then(()=>{
      console.log('libro añadido!');
    }).catch(error=>{
      console.log(error);
    })
  }

  esEditar(){
    if(this.ref !== null){
      this._libroSercive.getLibro(this.ref).subscribe(data =>{
        console.log(data.payload.data())
        this.createLibro.setValue({
          nombre :data.payload.data()['nombre'],
          imagen : data.payload.data()['imagen'],
          autor : data.payload.data()['idAutor']
        })
        let idAutor = data.payload.data()['idAutor'];
        this.esAutor(idAutor);
      });
      
      
      console.log(this.createLibro)
    }
  }

  esAutor(id:any){
    if(this.ref !== null){
      this.autores=[];
      this._libroSercive.getAutor(id).subscribe(data =>{
        console.log(data.payload.id)
        this.autores.push({
          id:data.payload.id,
          ...data.payload.data()
        })
      });
    }
  }
  editarLibro(id: string){
    const libro: any ={
      nombre:this.createLibro.value.nombre,
      idAutor:this.createLibro.value.autor,
      imagen:this.createLibro.value.imagen,
      fechaActualizacion: new Date()
    }
    this._libroSercive.actualizarLibro(id,libro).then(() =>{
      console.log('libro añadido!');
      location.href ="/indexcard/"+id;
    }).catch(error=>{
      console.log(error);
    });
  }

}
