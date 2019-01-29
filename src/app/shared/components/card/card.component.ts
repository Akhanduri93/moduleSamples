import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() title: string;
  @Input() info: string;
  @Input() shouldExpandCollapse = false;
  @Input() collapseTitle;
  @Input() expandTitle;
  @Input() objTitle: any = {};
  showInfo = false;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall]);

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
    this.configureCard();
  }

  configureCard() {
    const titleType = typeof this.title;
    const titleInfoTip = typeof this.info;
    if ( titleType === 'string' ) {
      this.objTitle.title = this.title;
    }

    if (titleInfoTip === 'string') {
      this.objTitle.infoTip = this.info;
    }

    if (this.objTitle.expandTitle === undefined) {
      this.objTitle.expandTitle = this.title;
    }

    if (this.objTitle.collapseTitle === undefined) {
      this.objTitle.collapseTitle = this.title;    }

    if (this.shouldExpandCollapse === false) {
      this.showInfo = true;
      this.objTitle.expandTitle = this.title;
    }
  }

  setHeightClassForDashboardCards() {
    let minHeight = '';
    switch (this.title) {
      case 'MLA':
        minHeight = 'min-height';
        break;
      case 'Emissão de Próximas Rendas':
        minHeight = 'min-height';
        break;
      default:
        minHeight = '';
        break;
    }

    return minHeight;
  }

  shouldHavePadding() {
    if ((this.title === 'Lista de Equipamentos') &&
      (this.breakpointObserver.isMatched(Breakpoints.XSmall) && this.showInfo || !this.breakpointObserver.isMatched(Breakpoints.XSmall))) {
      return 'card-padding';
    }
    return '';
  }

}
