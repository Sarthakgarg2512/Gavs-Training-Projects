import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { AppRoutingModule } from './app-routing.module';

const routes: Routes = [
  
{path:'home',component:HomeComponent},  
{path:'about-us', component:AboutUsComponent},
{path: 'contact-us', component:ContactUsComponent},
{path: 'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export  const routeComponents=[HomeComponent,AboutUsComponent,ContactUsComponent,LoginComponent];