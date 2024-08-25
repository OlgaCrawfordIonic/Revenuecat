import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RevenuecatPage } from './revenuecat.page';

describe('RevenuecatPage', () => {
  let component: RevenuecatPage;
  let fixture: ComponentFixture<RevenuecatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenuecatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
