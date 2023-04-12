import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthDTO, TokenDTO } from 'src/models/dto/dto.model';
import { AbstractRestService } from '../abstract-rest-service/abstract-rest-service.service';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends AbstractRestService<AuthDTO> {
  constructor(http: HttpClient, storage: LocalStorageService) {
    super(http, 'auth', storage);
  }

  /**
   * @description
   * Realiza a autenticação do usuário, para geração do token de acesso
   *
   * @param auth Objeto com as informações de autenticação
   * @returns { Promise<AuthDTO> } Objeto de autenticação
   */
  public async generateToken(auth: AuthDTO): Promise<TokenDTO> {
    return await this.post(auth, 'login', false);
  }
}
