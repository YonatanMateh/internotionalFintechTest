import { TestBed, inject } from '@angular/core/testing';

import { StatisticsDataService } from './statistics-data.service';

describe('StatisticsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatisticsDataService]
    });
  });

  it('should be created', inject([StatisticsDataService], (service: StatisticsDataService) => {
    expect(service).toBeTruthy();
  }));
});
