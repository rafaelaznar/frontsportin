import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './component/shared/menu/menu';
import { SidebarComponent } from './component/shared/sidebar/sidebar';
import { SessionService } from './service/session';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontsportin');
  private session = inject(SessionService);
  private destroyRef = inject(DestroyRef);
  isUser = signal(this.session.isUser());

  constructor() {
    this.session.subjectLogin.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      setTimeout(() => this.isUser.set(this.session.isUser()));
    });
    this.session.subjectLogout.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      setTimeout(() => this.isUser.set(false));
    });
  }
}
