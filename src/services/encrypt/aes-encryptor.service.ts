import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AESEncryptorService {
  private encryption: any;

  constructor() {
    this.encryption = CryptoJS.AES;
  }

  /**
   * Criptografa a string passada
   * @param data String a ser criptografada
   * @returns String de "data" criptografada
   */
  encrypt(data: string): string {
    const key = CryptoJS.enc.Utf8.parse('iOiIyMDYiLCJpYXQ');
    const iv = CryptoJS.enc.Utf8.parse('1MzEtOWNiOC1hN2U');
    const dataEncoded = CryptoJS.enc.Utf8.parse(data);
    const encrypted = this.encryption.encrypt(dataEncoded, key, {
      iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  }

  /**
   * Descriptografa a string passada
   * @param data String a ser descriptografada
   * @returns String de "data" descriptografada
   */
  decrypt(data: string): string {
    const key = CryptoJS.enc.Utf8.parse('iOiIyMDYiLCJpYXQ');
    const iv = CryptoJS.enc.Utf8.parse('1MzEtOWNiOC1hN2U');
    const decrypt = this.encryption.decrypt(data, key, {
      iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }
}
