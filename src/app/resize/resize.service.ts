import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, fromEvent, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ConfigEnum, IConfig, RESIZE_CONFIG_TOKEN } from './config';

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements OnDestroy {

  private destroy$: Subject<any> = new Subject<any>();
  currentSize: BehaviorSubject<ConfigEnum> = new BehaviorSubject<ConfigEnum>(this.takeSize(window.innerWidth));

  constructor(
    @Inject(RESIZE_CONFIG_TOKEN) private config: IConfig,
  ) {
    fromEvent(window, 'resize')
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        tap((event: Event) => {
          const innerWidth = (event.currentTarget as Window).innerWidth;
          const currentSize = this.takeSize(innerWidth);
          this.currentSize.next(currentSize);
        }),
        takeUntil(this.destroy$)
      ).subscribe((res) => {
    });
  }

  private takeSize(width: number): ConfigEnum {
    const {medium, large} = this.config;
    if (width < medium) {
      return ConfigEnum.small;
    } else if (medium <= width && width < large) {
      return ConfigEnum.medium;
    } else {
      return ConfigEnum.large;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.currentSize.complete();
  }
}
