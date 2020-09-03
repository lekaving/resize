import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { IfViewportSizeDirective } from './if-viewport-size.directive';
import { ResizeService } from './resize.service';

const EXPORTS = [IfViewportSizeDirective];

@NgModule({
  declarations: [...EXPORTS],
  imports: [
    CommonModule
  ],
  exports: [...EXPORTS],
})
export class ResizeModule {
  static forRoot(): ModuleWithProviders<ResizeModule> {
    return {
      ngModule: ResizeModule,
      providers: [ResizeService]
    };
  }
}
