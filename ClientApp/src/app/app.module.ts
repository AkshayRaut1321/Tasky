import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/AppComponent/app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ClickOutsideModule } from 'ng4-click-outside';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';
import { ReverseArrayPipe } from './pipes/reverse-array.pipe';
import { ScheduleMenuComponent } from './components/schedule-menu/schedule-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    NoteEditorComponent,
    ReverseArrayPipe,
    ScheduleMenuComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    ClickOutsideModule,
    NgbModule,
    NgxMultiselectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
