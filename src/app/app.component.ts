import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Expand {
  expand: boolean;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  expand$ = new BehaviorSubject<Expand>({ expand: false });
  expandAll(expand: Expand): void {
    this.expand$.next(expand);
  }
}

@Component({
  selector: 'test',
  template:
    '<button (click)="onClick()">Change value: {{ (value$ | async)?.expand }}</button>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Test {
  @Input()
  value = { expand: false };

  value$ = new BehaviorSubject(this.value);

  onClick() {
    const { expand } = this.value$.getValue();
    this.value$.next({ expand: !expand });
  }

  ngOnChanges({ value }: SimpleChanges) {
    console.log(value.currentValue);
    this.value$.next(value.currentValue);
  }
}
