import { TestBed } from '@angular/core/testing';

import { ProductInvertoryService } from './product-invertory.service';

describe('ProductInvertoryService', () => {
  let service: ProductInvertoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductInvertoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
