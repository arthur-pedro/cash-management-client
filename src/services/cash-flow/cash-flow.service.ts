import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO, CashFlowDTO, TokenDTO } from 'src/models/dto/dto.model';
import { AbstractRestService } from '../abstract-rest-service/abstract-rest-service.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CashFlowService extends AbstractRestService<CashFlowDTO> {
  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, 'cash-flow', storage);
  }
}
