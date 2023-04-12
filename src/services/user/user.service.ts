import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from 'src/models/dto/dto.model';
import { AbstractRestService } from '../abstract-rest-service/abstract-rest-service.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractRestService<UserDTO> {
  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, 'users', storage);
  }

  /**
   * @description
   * Faz a chamada GET na API do backend no endpoint users/logged.
   *
   * @param token token a ser pesquisado
   * @returns { Promise<UserDTO> } Objeto genérico
   */
  async getLoggeduser(): Promise<UserDTO> {
    return this.get('/logged', true);
  }

}
