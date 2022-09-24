import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { canActivate ,redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';


//componenetes
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './post-detail/post-detail.component';



const routes: Routes = [

  { 
    path: "", component:LoginComponent,
  },
  
  { 
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'post/:id', component: PostDetailComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['']))
  },
  { 
    path: 'post-page', component: PostsPageComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['']))
  }, 

  { 
    path: 'detail', component: PostDetailComponent,
    ...canActivate(()=> redirectUnauthorizedTo(['']))
  }, 
  
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }, 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  
export class AppRoutingModule { }