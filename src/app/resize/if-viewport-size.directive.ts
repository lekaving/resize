import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfigEnum } from './config';
import { ResizeService } from './resize.service';

@Directive({
  selector: '[ifViewportSize]'
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {

  @Input() ifViewportSize: string;

  private destroy$: Subject<any> = new Subject<any>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private resizeService: ResizeService
  ) {
  }

  // TODO leka: Вообщем это я считаю плохим решением так как элементов може быть дофига
  //  И на каждом элементе хранить подписку оверхед
  //  Можно было бы как в пред задание делать директиву варпера и от туда всем разруливать
  ngOnInit() {
    this.resizeService.currentSize.pipe(takeUntil(this.destroy$)).subscribe((res: ConfigEnum) => {
      this.viewContainer.clear();
      if (this.ifViewportSize === res) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
