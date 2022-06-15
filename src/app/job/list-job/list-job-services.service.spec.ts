import { TestBed } from '@angular/core/testing';

import { ListJobServicesService } from './list-job-services.service';

describe('ListJobServicesService', () => {
  let service: ListJobServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListJobServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
