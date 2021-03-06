import { Component, OnDestroy, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import {AuthenticationService} from '../../authentication.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnDestroy {
  authenticator = new AuthenticationService();
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  constructor(@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });

    window.dispatchEvent(new Event('resize'));
  }

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  logout(){
    this.authenticator.setPerfil(null);
    window.location.href = "/";
  }

  getWindow(): any {
    return window;
  }
}
