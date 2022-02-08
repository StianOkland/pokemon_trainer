import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { TrainerComponent } from './trainer/trainer.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: '', redirectTo:'/landing', pathMatch: 'full'},

  {path: 'landing', component: LandingComponent},
  {path: 'trainer', component: TrainerComponent, canActivate: [AuthGuard]},
  {path: 'catalogue', component: CatalogueComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AppRoutingModule { }
