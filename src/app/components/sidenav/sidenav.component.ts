import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;
  searchControl: FormControl;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public snackBar: MatSnackBar) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
      //this.userService.getCurrentUserInfo().subscribe(
      //    data => {
      //        this.userInfo = data;
      //        this.userService.currentUserInfo = data;
      //    },
      //    error => {
      //        this.snackBar.open(error, null, {
      //            duration: AppSettings.TOAST_DURATION,
      //        });
      //    }
      //);
  }

  toggleNotifications() {

  }

  ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
