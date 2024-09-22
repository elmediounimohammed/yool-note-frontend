import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantNavbarComponent } from './etudiant-navbar.component';

describe('EtudiantNavbarComponent', () => {
  let component: EtudiantNavbarComponent;
  let fixture: ComponentFixture<EtudiantNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantNavbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
