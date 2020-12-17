import {Component, OnInit, Inject, Renderer2, ElementRef, HostListener, ViewChild} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from './common/storage/storage.service';
import {AuthService} from './common/auth/auth.service';
import {GlobalService} from './common/global/global.service';
import {scrollTop} from './common/functions/scrolling';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('menu') menu: ElementRef;
  private _ROUTER: Subscription;
  title = 'Serve BMT';

  isExpanded = false;

  languages: any;
  selectedLanguage: any;
  user: any;

  constructor( private renderer: Renderer2,
               private router: Router,
               @Inject(DOCUMENT) private document: any,
               private element: ElementRef,

               public translate: TranslateService,
               public storageService: StorageService,
               public authService: AuthService,
               public globalService: GlobalService
               ) {
    this.languages = [
      {key: 'en', label:  'English'},
      {key: 'ru', label: 'Русский'}
    ];

    this.selectedLanguage = this.storageService.get('locale') || this.languages[0];

    translate.setDefaultLang('en');
    translate.use(this.selectedLanguage.key);
    if (this.isUserLoggedIn()) {
      this.globalService.getUserData().subscribe((res) => {
        this.globalService.setUserData(res.data);
      });
    }

    this.globalService.userData.subscribe((data) => {
      this.user = data;
    });
  }
  ngOnInit() {}

  switchLanguage() {
    location.reload();
    this.storageService.set('locale', this.selectedLanguage);
  }

  isUserLoggedIn() {
    return this.authService.loggedIn();
  }

  logOut() {
    this.authService.logoutUser();
  }

  onActivate() {
    scrollTop();
  }

  toggleActive(event: any){
    // event.preventDefault();
    // if (this.navElement !== undefined){
    //   this.navElement.style.backgroundColor = 'white';
    // }
    // const target = event.currentTarget;
    // target.style.backgroundColor = '#e51282';
    // this.navElement = target;
  }
}
