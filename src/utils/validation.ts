import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as moment from 'moment';

class Validation {
  /**
   * @description
   * Verifica se o value/objeto está instanciado.
   * Se o tipo do value for Array ou String então valida tamanho maior que zero.
   * Retorna true caso tenha conteúdo, false caso contrário
   *
   * @usageNotes
   *
   * ```typescript
   * import validation from 'src/app/utils/validation';
   *
   * var array = []
   * if(validation.hasContent(array)) {
   *    // code...
   * }
   * ```
   *
   * @param value Valor de qualquer tipo
   * @returns {boolean}
   */
  public hasContent(value: number | string | Array<any> | Object | null): boolean {
    if (value != null) {
      if (typeof value === 'string' || Array.isArray(value)) {
        if (value.length > 0) {
          return true;
        }
        return false;
      }
      return true;
    }
    return false;
  }

  /**
   * @description
   * Valida se o email informado é minimamente válido
   *
   * @usageNotes
   *
   * ```typescript
   * import validation from 'src/app/utils/validation';
   *
   * var email = 'teste@email.com'
   * if(validation.isEmailValid(email)) {
   *    // code...
   * }
   * ```
   *
   * @param email Email a ser validado
   * @returns {boolean}
   */
  public isEmailValid(email: string): boolean {
    if (email == '') {
      return false;
    }
    let validador = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return validador.test(email);
  }

  /**
   * @description
   * Valida se o CNPJ informado é válido
   *
   * @usageNotes
   *
   * ```typescript
   * import validation from 'src/app/utils/validation';
   *
   * var cnpj = '00000000000000'
   * if(validation.isCnpjValid(cnpj)) {
   *    // code...
   * }
   * ```
   *
   * @param cnpj CNPJ a ser validado
   * @returns {boolean}
   */
  public isCnpjValid(cnpj: string): boolean {
    if (!this.hasContent(cnpj)) {
      return false;
    }
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14) return false;

    if (
      cnpj == '00000000000000' ||
      cnpj == '11111111111111' ||
      cnpj == '22222222222222' ||
      cnpj == '33333333333333' ||
      cnpj == '44444444444444' ||
      cnpj == '55555555555555' ||
      cnpj == '66666666666666' ||
      cnpj == '77777777777777' ||
      cnpj == '88888888888888' ||
      cnpj == '99999999999999'
    )
      return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != Number(digitos.charAt(0))) {
      return false;
    }

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) {
        pos = 9;
      }
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != Number(digitos.charAt(1))) {
      return false;
    }
    return true;
  }

  /**
   * @description
   * Valida se o CPF informado é válido
   *
   * @usageNotes
   *
   * ```typescript
   * import validation from 'src/app/utils/validation';
   *
   * var cpf = '00000000000'
   * if(validation.isCpfValid(cpf)) {
   *    // code...
   * }
   * ```
   *
   * @param cpf CPF a ser validado
   * @returns {boolean}
   */
  public isCpfValid(cpf: string): boolean {
    if (!this.hasContent(cpf)) {
      return false;
    }
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    ) {
      return false;
    }
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
      rev = 0;
    }
    if (rev != parseInt(cpf.charAt(9))) {
      return false;
    }

    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) {
      rev = 0;
    }
    if (rev != parseInt(cpf.charAt(10))) {
      return false;
    }
    return true;
  }

  /**
   * @description
   * Valida se o valor email é valido
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorEmail('Email inválido'),
   * ]);
   * ```
   *
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorEmail(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control == null) {
        return { msgError: msgError };
      }
      if (!this.hasContent(control.value)) {
        return { msgError: msgError };
      }
      if (
        !this.isEmailValid(control.value) ||
        control.value.length < 4 ||
        control.value.length > 100
      ) {
        return { msgError: msgError };
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se o valor do CPF é valido
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorCpf('CPF inválido'),
   * ]);
   * ```
   *
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorCpf(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control == null) {
        return { msgError: msgError };
      }
      if (!this.isCpfValid(control.value)) {
        return { msgError: msgError };
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se o valor do CNPJ é valido
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorCnpj('CNPJ inválido'),
   * ]);
   * ```
   *
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorCnpj(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control == null) {
        return { msgError: msgError };
      }
      if (!this.isCnpjValid(control.value)) {
        return { msgError: msgError };
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se a opção no input search está válida
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorInputSearch('Campo inválido'),
   * ]);
   * ```
   *
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorInputSearch(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control == null || control.value == null) {
        return { msgError: msgError };
      }
      if (typeof control.value === 'object' && control.value.id > 0) {
        return null;
      }
      return { msgError: msgError };
    };
  }

  /**
   * @description
   * Valida se o valor do input é um password válido
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorPassword('Senha inválida'),
   * ]);
   * ```
   *
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorPassword(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control == null) {
        return { msgError: msgError };
      }
      if (!this.hasContent(control.value)) {
        return { msgError: msgError };
      }
      if (
        control.value.length < 7 ||
        control.value.length > 50 ||
        !/\d/.test(control.value.toString()) ||
        !/[a-zA-Z]/g.test(control.value.toString())
      ) {
        return { msgError: msgError };
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se o valor do input é um formato de hora:minuto:segundo válido
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorHourMinuteSecond('Horário inválido'),
   * ]);
   * ```
   *
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorHourMinuteSecond(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control == null) {
        return { msgError: msgError };
      }
      if (!this.hasContent(control.value)) {
        return { msgError: msgError };
      }
      try {
        const hour: number = parseInt(control.value.substring(0, 2));
        const minute: number = parseInt(control.value.substring(2, 4));

        if (hour < 0 || hour > 24 || minute < 0 || minute > 59) {
          return { msgError: msgError };
        }
      } catch (error) {
        return null;
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se o valor email é valido
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorNullOrEmpty('O valor informado não pode ser null'),
   * ]);
   * ```
   *
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorNullOrEmpty(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control == null) {
        return { msgError: msgError };
      }
      if (!this.hasContent(control.value)) {
        return { msgError: msgError };
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se o valor mínimo foi inserido no input
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorMinValue(6, 'O código de acesso digitado está inválido. O código deve conter 6 dígitos'),
   * ]);
   * ```
   *
   * @param minValue Mínimo valor aceito para o input ser válido
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorMinValue(minValue: number, msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (this.hasContent(minValue) && control && this.hasContent(control.value)) {
        if (parseFloat(control.value) < minValue) {
          return { msgError: msgError, params: `{minValue: ${minValue}}` };
        }
      }
      return null;
    };
  }

  public createValidatorMinCtrlValue(
    controlConfirm: AbstractControl,
    msgError: string,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (this.hasContent(controlConfirm.value) && control && this.hasContent(control.value)) {
        if (parseFloat(control.value) < controlConfirm.value) {
          return { msgError: msgError, params: `{minValue: ${controlConfirm.value}}` };
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se o valor máximo foi inserido no input
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorMaxValue(6, 'O código de acesso digitado está inválido. O código deve conter 6 dígitos'),
   * ]);
   * ```
   *
   * @param maxValue Máximo valor aceito para o input ser válido
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorMaxValue(maxValue: number, msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (this.hasContent(maxValue) && control && this.hasContent(control.value)) {
        if (parseFloat(control.value) > maxValue) {
          return { msgError: msgError, params: `{maxValue: ${maxValue}}` };
        }
      }
      return null;
    };
  }

  public createValidatorMaxCtrlValue(
    controlConfirm: AbstractControl,
    msgError: string,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (this.hasContent(controlConfirm.value) && control && this.hasContent(control.value)) {
        if (parseFloat(control.value) > controlConfirm.value) {
          return { msgError: msgError, params: `{maxValue: ${controlConfirm.value}}` };
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se a quantidade mínima de caracteres foi inserida no input
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorMinLength(6, 'O código de acesso digitado está inválido. O código deve conter 6 dígitos'),
   * ]);
   * ```
   *
   * @param minLength Mínimo valor de caracteres aceitos para o input ser válido
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorMinLength(minLength: number, msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (minLength && control && control.value) {
        if (control.value.length < minLength) {
          return { msgError: msgError, params: `{minLength: ${minLength}}` };
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se a quantidade máxima de caracteres foi inserida no input
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl('',[
   *     validation.createValidatorMaxLength(6, 'O campo precisa ter um tamanho máx de 6 dígitos'),
   * ]);
   * ```
   *
   * @param maxLength Máximo valor de caracteres aceitos para o input ser válido
   * @param msgError Mensagem exibida na tela
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorMaxLength(maxLength: number, msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (maxLength && control && control.value) {
        if (control.value.length > maxLength) {
          return { msgError: msgError, params: `{maxLength: ${maxLength}}` };
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Método que faz a validação se dois controles estão com os valores iguais.
   *
   * @usageNotes
   * Pode ser usado para criar validações de FormControls:
   *
   * ```typescript
   * ctrl: FormControl = new FormControl();
   *
   * otherCtrl: FormControl = new FormControl('',[
   *     validation.createValidatorEquals(this.equalsCtrl, 'Os campos precisam ser iguais'),
   * ]);
   * ```
   *
   * @param controlConfirm Segundo controle que terá que ser igual.
   * @param msgError Mensagem que será exibida se os valores estiverem diferentes.
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorEquals(controlConfirm: AbstractControl, msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (controlConfirm && control && controlConfirm.value && control.value) {
        if (controlConfirm.value != control.value) {
          return { msgError: msgError };
        } else {
          controlConfirm.setErrors(null);
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Método que valida elementos do controlados com o FormControl
   *
   * @usageNotes
   * ```typescript
   * const control = new FormControl(validator.hasContent, 'Campo Obrigatório');
   * ```
   *
   * @param func Função que recebe string e retorna boolean
   * @param msg Mensagem de erro a ser exibida
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidator(func: any, msg: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (!func(control.value)) {
        return { msgError: msg };
      }
      return null;
    };
  }

  /**
   * @description
   * Método que valida elementos do controlados com o FormControl
   *
   * @usageNotes
   * ```typescript
   * const control = new FormControl(validator.createValidatorOnlyBeforeDate, 'Erro');
   * ```
   * Valida se a data é menor que a data de hoje
   * @param msgError Mensagem exibida na tela no caso de sequência inválida
   *
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorOnlyBeforeDate(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      const dateControl = new Date();
      dateControl.setHours(0);
      dateControl.setSeconds(0);
      dateControl.setMinutes(0);
      if (control && control.value) {
        if (
          !moment(new Date(control.value), 'DD/MM/YYYY').isBefore(moment(dateControl, 'DD/MM/YYYY'))
        ) {
          const error = { msgError };
          return error;
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se a data é maior que a data de hoje
   *
   * @usageNotes
   * ```typescript
   * const control = new FormControl(validator.createValidatorOnlyAfterDate, 'Erro');
   * ```
   * @param msgError Mensagem exibida na tela no caso de sequência inválida
   *
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorOnlyAfterDate(msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      const dateControl = new Date();
      dateControl.setHours(0);
      dateControl.setMinutes(0);
      dateControl.setSeconds(0);

      const today = new Date(control.value);
      today.setHours(23);
      today.setMinutes(59);
      today.setSeconds(59);

      if (control && control.value) {
        if (
          !moment(dateControl, 'DD/MM/YYYY HH:mm:ss').isSameOrBefore(
            moment(today, 'DD/MM/YYYY HH:mm:ss'),
          )
        ) {
          const error = { msgError };
          return error;
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se o período entre duas datas está válido
   *
   * @usageNotes
   * ```typescript
   * const control = new FormControl(validator.createValidatorDatesPeriod, 'Erro');
   * ```
   * @param otherDateControl Controle da segunda data que será comparada
   * @param maxPeriodDays Quantidade de dias que valida o período entre as datas
   * @param msgError Mensagem exibida na tela no caso de período inválido
   *
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorDatesPeriod(
    otherDateControl: AbstractControl,
    maxPeriodDays: number,
    msgError: string,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (otherDateControl && control && otherDateControl.value && control.value) {
        let datesPeriodDays = moment(control.value, 'DD/MM/YYYY').diff(
          moment(otherDateControl.value, 'DD/MM/YYYY'),
          'day',
        );

        if (Math.abs(datesPeriodDays) > maxPeriodDays) {
          return { msgError: msgError, params: `{maxPeriod: ${maxPeriodDays}}` };
        } else if (otherDateControl.getError('msgError') == msgError) {
          otherDateControl.setErrors(null);
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se a data inicial é menor que ou igual a data final
   *
   * @usageNotes
   * ```typescript
   * const control = new FormControl(validator.createValidatorInitialDateSequence, 'Erro');
   * ```
   * @param finalDateControl Controle da data final que será comparada
   * @param msgError Mensagem exibida na tela no caso de sequência inválida. Exibida no campo da data final
   *
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorInitialDateSequence(
    finalDateControl: AbstractControl,
    msgError: string,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (finalDateControl && control && finalDateControl.value && control.value) {
        if (
          !moment(control.value, 'DD/MM/YYYY').isSameOrBefore(
            moment(finalDateControl.value, 'DD/MM/YYYY'),
          )
        ) {
          let error = { msgError: msgError };
          finalDateControl.markAsTouched();
          finalDateControl.setErrors(error);
        } else if (finalDateControl.getError('msgError') == msgError) {
          finalDateControl.setErrors(null);
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Valida se a data final é maior que ou igual a data inicial
   *
   * @usageNotes
   * ```typescript
   * const control = new FormControl(validator.createValidatorFinalDateSequence, 'Erro');
   *
   * @param initialDateControl Controle da data inicial que será comparada
   * @param msgError Mensagem exibida na tela no caso de sequência inválida
   *
   * @returns {ValidatorFn} ValidatorFn
   */
  public createValidatorFinalDateSequence(
    initialDateControl: AbstractControl,
    msgError: string,
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (initialDateControl && control && initialDateControl.value && control.value) {
        if (
          !moment(control.value, 'DD/MM/YYYY').isSameOrAfter(
            moment(initialDateControl.value, 'DD/MM/YYYY'),
          )
        ) {
          let error = { msgError: msgError };
          return error;
        }
      }
      return null;
    };
  }

  /**
   * @description
   * Método que localizar o primeiro formControl inválido e seta o focus nele.
   *
   * @usageNotes
   * ```typescript
   * public submit(): void {
   *      if (this.ctrl.valid) {
   *          // code...
   *      } else {
   *          this.ctrl.markAsTouched();
   *          validation.setFocusFirstInvalidForm();
   *      }
   *  }
   * ```
   *
   * @returns
   */
  public setFocusFirstInvalidForm(): void {
    let invalid: HTMLElement | null = document.querySelector('.ng-invalid');
    if (invalid) {
      let input: HTMLElement | null = invalid.querySelector('.mat-input-element');
      if (input) {
        input.focus({ preventScroll: false });
      }
    }
  }

  /** *
   * @description
   * Método que valida se um controle do tipo array tem o tamanho (quantidade de itens) válido de acordo o valor passado.
   *
   * @param validLength Valor válido para o tamanho do array. *
   * @param msgError Mensagem que será exibida se o tamanho do array estiver diferente do valor válido.
   * */
  public createValidatorArrayLength(validLength: number, msgError: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: string } | null => {
      if (control && control.value && control.value instanceof Array) {
        if (control.value.length != validLength) {
          return { msgError: msgError };
        }
      }
      return null;
    };
  }
}

export default new Validation();
