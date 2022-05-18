import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class LibroService{
    constructor(private firestore: AngularFirestore){}

    agregarLibro(libro:any): Promise<any>{
        return this.firestore.collection('libros').add(libro)
    }

    getLibros():Observable<any>{
        return this.firestore.collection('libros',ref => ref.orderBy('fechaCreacion','asc')).snapshotChanges();
    }

    eliminarLibro(id:string):Promise<any>{
        return this.firestore.collection('libros').doc(id).delete();
    }

    getLibro(id:string):Observable<any>{
        return this.firestore.collection('libros').doc(id).snapshotChanges();
    }

    actualizarLibro(id: string, data: any):Promise<any>{
        return this.firestore.collection('libros').doc(id).update(data);
    }

    getAutores():Observable<any> {
        return this.firestore.collection('autores',ref => ref.orderBy('idUnico','asc')).snapshotChanges();
    }

    getAutor(id:string):Observable<any>{
        return this.firestore.collection('autores').doc(id).snapshotChanges();
    }

    getLibroByAutor(id:string):Observable<any>{
        return this.firestore.collection('libros', ref => ref.where('idAutor',"==",id)).snapshotChanges();
    }

    agregarAutor(autor:any): Promise<any>{
        return this.firestore.collection('autores').add(autor);
    }

    eliminarAutor(id:string):Promise<any>{
        return this.firestore.collection('autores').doc(id).delete();
    }
}