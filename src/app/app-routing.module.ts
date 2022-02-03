import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { TrainerComponent } from './trainer/trainer.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

const routes: Routes = [
  {path: '', redirectTo:'/landing', pathMatch: 'full'},

  {path: 'landing', component: LandingComponent},
  {path: 'trainer', component: TrainerComponent},
  {path: 'catalogue', component: CatalogueComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
