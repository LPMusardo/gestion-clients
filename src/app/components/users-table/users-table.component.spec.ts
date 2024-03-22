import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { AppModule } from '../../app.module';
import { UsersTableComponent } from './users-table.component';

describe('UsersTableComponent', () => {
  let component: UsersTableComponent;
  let fixture: ComponentFixture<UsersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersTableComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersTableComponent);
    component = fixture.componentInstance;
    component.dataSource = of([]);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
