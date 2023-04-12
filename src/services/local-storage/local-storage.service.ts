import { Injectable } from '@angular/core';
import { AESEncryptorService } from '../encrypt/aes-encryptor.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private encryptor: AESEncryptorService) {}

  /**
   * @description
   * Atribui um valor ao localStorage
   *
   * @param key chave
   * @param value valor
   */
  public setItem<T>(key: string, value: T): void {
    try {
      const encryptKey: string = this.encryptor.encrypt(key);
      const encryptValue: string = this.encryptor.encrypt(JSON.stringify(value));
      localStorage.setItem(encryptKey, encryptValue);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Captura e retorna um item do localStorage equivalente
   * a chave informada por parâmetro
   *
   * @param key chave
   * @returns item do localStorage
   */
  public getItem<T>(key: string): T {
    try {
      const encryptKey: string = this.encryptor.encrypt(key);
      const storageValue: string | null = localStorage.getItem(encryptKey);
      if (storageValue != null) {
        return JSON.parse(this.encryptor.decrypt(storageValue));
      } else {
        throw new Error();
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * @description
   * Limpa todos os itens do localStorage
   */
  public clear(): void {
    localStorage.clear();
  }

  /**
   * @description
   * Remove um item criptografado do localStorage
   *
   * @param key chave
   */
  public removeItem(key: string): void {
    const encryptKey: string = this.encryptor.encrypt(key);
    localStorage.removeItem(encryptKey);
  }
}
