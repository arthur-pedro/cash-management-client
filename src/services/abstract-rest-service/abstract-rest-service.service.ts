import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LocalStorageEnumType } from 'src/enum/local-storage.enum';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

type HttpResponseType = 'json' | 'text' | 'arraybuffer' | 'blob' | undefined;

/**
 * @description
 * Abstrai as chamadas de serviços realizadas para a api configurada da .env
 * Esta classe dese ser usada nas classes de serviço, para realização de chamadas
 * de serviço.
 *
 * @usageNotes
 * ```typescript
 * import { HttpClient } from '@angular/common/http';
 * import { Injectable } from '@angular/core';
 * import { Doctor, User } from 'src/app/model/dto/dto.model';
 * import { ActionRequestMapping } from 'src/app/model/support/action-request-mapping';
 * import { RequestMapping } from 'src/app/model/support/request-mapping';
 * import { AbstractRestService } from '../abstract-rest-service/abstract-rest-service.service';
 * import { LocalStorageService } from '../local-storage/local-storage.service';
 *
 * \@Injectable\{
 *     providedIn: 'root',
 * })
 * export class DoctorService extends AbstractRestService<Doctor> {
 *  constructor(http: HttpClient, storage: LocalStorageService) {
 *   super(http, RequestMapping.DOCTOR, storage);
 * }
 *
 *   preRegister(user: User): Promise<void> {
 *     return this.post(user, ActionRequestMapping.PRE_REGISTER, true);
 *   }
 * }
 * ```
 *
 */
export abstract class AbstractRestService<T> {
  protected api: string = '';

  protected requestMapping: string = '';

  constructor(
    protected http: HttpClient,
    protected entityPath: string,
    protected storage: LocalStorageService,
    protected externalApi?: string,
  ) {
    this.api = environment.api.url;
    if (externalApi) {
      this.api = externalApi;
    }
    this.requestMapping = this.api + this.entityPath;
  }

  public getApi(): string {
    return this.requestMapping;
  }

  /**
   * @description
   * Faz a chamada POST na API do backend no endpoint { ActionRequestMapping.SAVE }. Toda requisição deita por este método,
   * terá o token incluído no header da requisição
   *
   * @usageNotes
   * ```typescript
   * // Tipo de resposta default
   * this.doctorService.save(this.getFormValue());
   *
   * // Tipo da resposta customizado
   * this.doctorService.save(this.getFormValue());
   * ```
   * @param entity Entidade a ser persistida no serviço
   * @returns { Promise<any> } any
   */
  async save(entity: T, params?: HttpParams): Promise<any> {
    const header = this.addToken();
    const body = entity;
    return lastValueFrom(
      this.http.post(`${this.requestMapping}/save`, body, {
        headers: header,
        params: params,
      }),
    );
  }

  /**
   * @description
   * Faz a chamada PUT na API do backend no endpoint { ActionRequestMapping.UPDATE }. Toda requisição deita por este método,
   * terá o token incluído no header da requisição
   *
   * @usageNotes
   * ```typescript
   * // Tipo de resposta default
   * this.doctorService.update(this.getFormValue());
   *
   * // Tipo da resposta customizado
   * this.doctorService.update(this.getFormValue());
   * ```
   * @param entity Entidade a ser persistida no serviço
   * @returns { Promise<any> } any
   */
  async update(entity: T, params?: HttpParams): Promise<any> {
    const header = this.addToken();
    const body = entity;
    return lastValueFrom(
      this.http.put(`${this.requestMapping}/update`, body, {
        headers: header,
        params: params,
      }),
    );
  }

  /**
   * @description
   * Faz a chamada DELETE na API do backend no endpoint { ActionRequestMapping.DELETE }. Toda requisição deita por este método,
   * terá o token incluído no header da requisição
   *
   * @usageNotes
   * ```typescript
   *
   * this.doctorService.delete(1);
   *
   * ```
   * @param id Entidade a ser persistida no serviço
   * @returns { Promise<any> } any
   */
  async delete(id: number, params?: HttpParams): Promise<any> {
    const header = this.addToken();
    return lastValueFrom(
      this.http.delete(`${this.requestMapping}/delete/${id}`, {
        headers: header,
        params: params,
      }),
    );
  }


  /**
   * ### Chamadas HTTP Genéricas ###
   * Estes serviços apenas serão utilizados quando nenhum outro acima se encaixar na
   * proposta da regra de negócio
   */

  /**
   * @description
   * Faz a chamada GET na API do backend. O token no cabeçalho dessa requisição é
   * opcional.
   *
   * @usageNotes
   * ```typescript
   * this.doctorService.get('abc', false);
   * ```
   * @param url url da requisição
   * @param hasToken indica se haverá token na requisicao
   * @param page paginacao
   * @returns { Promise<any> } Objeto genérico
   */
  async get(url?: string, hasToken?: boolean): Promise<any> {
    let header = new HttpHeaders();
    let params = new HttpParams();
    if (hasToken) {
      header = this.addToken();
    }
    return lastValueFrom(
      this.http.get(`${this.requestMapping}${url}`, { headers: header, params: params }),
    );
  }

  /**
   * @description
   * Faz a chamada POST na API do backend. O token no cabeçalho dessa requisição é
   * opcional.
   *
   * @usageNotes
   * ```typescript
   * this.doctorService.post(this.getFormValue(), '/update' false, 'text');
   * ```
   * @param body objeto a ser enviado
   * @param url url da requisição
   * @param hasToken indica se o token vai ser adicionado na requisição
   * @param responseType tipo da resposta
   * @returns { Promise<any> } Objeto genérico
   */
  async post(
    body: any,
    url: string,
    hasToken?: boolean,
    responseType?: HttpResponseType,
  ): Promise<any> {
    let headers = new HttpHeaders();
    if (hasToken) {
      headers = this.addToken();
    }
    return lastValueFrom(
      this.http.post(`${this.requestMapping}/${url}`, body, {
        headers,
        responseType:
          !responseType || (responseType && responseType == 'json')
            ? 'json'
            : (responseType as 'json'),
      }),
    );
  }

  /**
   * @description
   * Faz a chamada PUT na API do backend. O token no cabeçalho dessa requisição é
   * opcional.
   *
   * @usageNotes
   * ```typescript
   * this.doctorService.put(this.getFormValue(), '/update', false, 'text');
   * ```
   * @param body objeto a ser enviado
   * @param url url da requisição
   * @param hasToken indica se o token vai ser adicionado na requisição
   * @param responseType tipo da resposta
   * @returns { Promise<any> } Objeto genérico
   */
  async put(
    body: any,
    url: string,
    hasToken?: boolean,
    responseType?: HttpResponseType,
  ): Promise<any> {
    let headers = new HttpHeaders();
    if (hasToken) {
      headers = this.addToken();
    }
    return lastValueFrom(
      this.http.put(`${this.requestMapping}${url}`, body, {
        headers,
        responseType:
          !responseType || (responseType && responseType == 'json')
            ? 'json'
            : (responseType as 'json'),
      }),
    );
  }

  protected addToken(): HttpHeaders {
    let tokenStr = 'Bearer ' + this.storage.getItem<string>(LocalStorageEnumType.TOKEN);
    return new HttpHeaders().set('Authorization', tokenStr);
  }
}
