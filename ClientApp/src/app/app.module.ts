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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

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
    NgxMultiselectModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production
      /* When angular serviceWorker doesn't register itself in v7 and v8 then following code can be used to regsiter it.
      Another way to register is set the 'registrationStrategy' to registerImmediately while registering serviceWorker in AppModule */
      , registrationStrategy: 'registerImmediately'
     })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
