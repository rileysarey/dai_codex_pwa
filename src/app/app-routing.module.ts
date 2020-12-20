import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { TarotComponent } from './tarot/tarot.component';
import { CodexComponent } from './codex/codex.component';


const routes: Routes = [
  { path: '', component: CategoryComponent},
  { path: ':category', component: TarotComponent},
  { path: ':category/:title', component: CodexComponent}
];

RouterModule.forRoot(
  routes, 
  {scrollPositionRestoration: 'disabled'}
)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
