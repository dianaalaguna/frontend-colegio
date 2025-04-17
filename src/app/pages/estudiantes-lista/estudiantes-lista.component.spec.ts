import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesListaComponent } from './estudiantes-lista.component';

describe('EstudiantesListaComponent', () => {
  let component: EstudiantesListaComponent;
  let fixture: ComponentFixture<EstudiantesListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstudiantesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
