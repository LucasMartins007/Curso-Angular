import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent, },
    { path: '', component: LayoutComponent, children: [
        { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ]},
        { path: '', redirectTo: '/home', pathMatch: 'full' }
    ] }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
//* Define as rotas comuns a aplicação (geral), não à funcionalidade */
export class AppRoutingModule { }
