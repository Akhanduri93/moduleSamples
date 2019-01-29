import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetectBrowserService } from '../../services/detect-browser.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  ieFlag;
  constructor(private detectBrowserService: DetectBrowserService, private router: Router) {
  }

  ngOnInit() {
    this.ieFlag = this.detectBrowserService.isIE();
    if (this.ieFlag !== false) {
      this.router.navigate(['/no-ie-support']);
    }
  }
}
