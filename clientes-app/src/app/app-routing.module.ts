import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: 'home', component: HomeComponent, }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
//* Define as rotas comuns a aplicação (geral), não à funcionalidade */
export class AppRoutingModule { }
