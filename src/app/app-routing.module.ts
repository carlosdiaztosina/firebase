import { IndexcardComponent } from './indexcard/indexcard.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './home/home.component';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'home/:id', component: HomeComponent},
  { path: 'books', component: BooksComponent},
  { path: 'indexcard', component: IndexcardComponent},
  { path: 'indexcard/:id', component: IndexcardComponent},
  { path: 'authors', component: AuthorsComponent},
  { path: 'authors/:idAutor', component: AuthorsComponent},
  { path: '**', component: PagenotfoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [HomeComponent,
                                  BooksComponent,
                                  IndexcardComponent,
                                  AuthorsComponent,
                                  PagenotfoundComponent]
