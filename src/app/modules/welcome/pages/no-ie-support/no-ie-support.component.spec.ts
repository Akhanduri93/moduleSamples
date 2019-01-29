import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoIESupportComponent } from './no-ie-support.component';
import { By } from '@angular/platform-browser';

describe('NoIESupportComponent', () => {
  let component: NoIESupportComponent;
  let fixture: ComponentFixture<NoIESupportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoIESupportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoIESupportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have images', () => {
    const de = fixture.debugElement.query(By.css('img'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });

  it('should have browser images with correct URL', () => {
    const de = fixture.debugElement.queryAll(By.css('a'));
    expect(de.length).toBeGreaterThan(0);
    const elChrome: HTMLAnchorElement = de[0].nativeElement;
    expect(elChrome.href).toBe('https://www.google.pt/chrome/');
    const imgChromeE = elChrome.querySelector('img');
    expect(imgChromeE).not.toBeNull();

    const elFireFox: HTMLAnchorElement = de[1].nativeElement;
    expect(elFireFox.href).toBe('https://www.mozilla.org/pt-PT/firefox/new/');
    const imgFFE = elFireFox.querySelector('img');
    expect(imgFFE).not.toBeNull();

    const elEdge: HTMLAnchorElement = de[2].nativeElement;
    expect(elEdge.href).toBe('https://www.microsoft.com/pt-pt/windows/microsoft-edge');
    const imgEE = elEdge.querySelector('img');
    expect(imgEE).not.toBeNull();

    const elSafari: HTMLAnchorElement = de[3].nativeElement;
    expect(elSafari.href).toBe('https://support.apple.com/pt_PT/downloads/safari');
    const imgSE = elSafari.querySelector('img');
    expect(imgSE).not.toBeNull();
  });

  it('should have message', () => {
    const de = fixture.debugElement.query(By.css('h1'));
    const el: HTMLElement = de.nativeElement;
    expect(el).not.toBeNull();
  });
});
