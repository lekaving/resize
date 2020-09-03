import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CONFIG, RESIZE_CONFIG_TOKEN } from './resize/config';
import { ResizeModule } from './resize/resize.module';
import { TestComponent } from './test.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    ResizeModule.forRoot()
  ],
  providers: [
    {
      provide: RESIZE_CONFIG_TOKEN,
      useValue: CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
