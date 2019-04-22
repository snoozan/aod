import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CardComponent } from './app.component';
import { ContentGridComponent } from './content-grid/content-grid.component';
import { ContentDisplayComponent } from './content-display/content-display.component';
import { HttpClientModule } from '@angular/common/http';
import { ContentFullViewComponent } from './content-full-view/content-full-view.component';
import { ContentCreateComponent } from './content-create/content-create.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ContentGridComponent,
    ContentDisplayComponent,
    ContentFullViewComponent,
    ContentCreateComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
