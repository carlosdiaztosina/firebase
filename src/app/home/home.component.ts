import { Component, OnInit, ViewChild } from '@angular/core';
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

  regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;

  fotoCardLibro = "https://siempreenmedio.files.wordpress.com/2014/04/no_disponible.jpg";
  fotoCardAutor = "https://siempreenmedio.files.wordpress.com/2014/04/no_disponible.jpg";

  ref : string| null;

  createLibro: FormGroup;
  createAutor: FormGroup;

  submit = false;

  constructor(private route : ActivatedRoute, private fb: FormBuilder, private _libroSercive: LibroService){ 
    this.createLibro = this.fb.group({
      nombre:['',Validators.required],
      autor:['',Validators.required],
      imagen:['',[Validators.required,Validators.pattern(this.regex)]]
    });
    this.createAutor = this.fb.group({
      autorNuevo:['',Validators.required],
      autorImagen:['',[Validators.required,Validators.pattern(this.regex)]]
    });

    this.ref = this.route.snapshot.paramMap.get('id');
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
      this.editarLibro(this.ref);
    }
  }

  agregarLibro(){
    console.log(this.createLibro)
    
    // var imagen = this.regex.test(this.createLibro.value.imagen) ? this.createLibro.value.imagen : this.fotoCardLibro;
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
      console.log(document.getElementsByTagName('autorLibro'));
      this.createAutor.setValue({
        autorNuevo:'',
        autorImagen:''
      });
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
        this.imagenCard(data.payload.data()['imagen']);
        let idAutor = data.payload.data()['idAutor'];
        this.esAutor(idAutor);
      });
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

  imagenCard(foto:string){
    if(!this.regex .test(foto)) {
      this.fotoCardLibro = "https://siempreenmedio.files.wordpress.com/2014/04/no_disponible.jpg";
    }else{
      this.fotoCardLibro = foto;
      
    }
  }

  imagenCardAutor(foto:string){
    if(!this.regex .test(foto)) {
      this.fotoCardAutor = "https://siempreenmedio.files.wordpress.com/2014/04/no_disponible.jpg";
    }else{
      this.fotoCardAutor = foto;
      
    }
  }

}
