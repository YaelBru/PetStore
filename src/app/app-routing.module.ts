import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { AboutComponent } from './about/about.component';
import { AdoptComponent } from './adopt/adopt.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'adopt', component: AdoptComponent },
  { path: 'contact', component: ContactComponent },
  {
    path: 'store',
    loadChildren: () => import('./pet-store/pet-store.module').then(m => m.PetStoreModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
