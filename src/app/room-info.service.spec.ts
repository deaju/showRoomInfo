import { TestBed, inject } from '@angular/core/testing';

import { RoomInfoService } from './room-info.service';

describe('RoomInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomInfoService]
    });
  });

  it('should be created', inject([RoomInfoService], (service: RoomInfoService) => {
    expect(service).toBeTruthy();
  }));
});
