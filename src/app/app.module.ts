import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AboutComponent } from './about/about.component';
import { SvgSpriteSheetComponent } from './svg-sprite-sheet/svg-sprite-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AboutComponent,
    SvgSpriteSheetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
