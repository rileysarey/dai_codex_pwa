import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { TarotComponent } from './tarot/tarot.component';
import { CodexComponent } from './codex/codex.component';
import { ListComponent } from './components/list/list.component';
import { HeaderComponent } from './components/header/header.component';
import { ScrollLengthService } from './services/scroll-length.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModalComponent } from './components/layout-modal/layout-modal.component';
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    TarotComponent,
    CodexComponent,
    ListComponent,
    HeaderComponent,
    LayoutModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    ScrollLengthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
