import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryComponent } from './product-inventory.component';

describe('ProductInventoryComponent', () => {
  let component: ProductInventoryComponent;
  let fixture: ComponentFixture<ProductInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInventoryComponent]
    });
    fixture = TestBed.createComponent(ProductInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
