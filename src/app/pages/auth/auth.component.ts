import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocalStorageEnumType } from 'src/enum/local-storage.enum';
import { AuthDTO } from 'src/models/dto/dto.model';
import { AuthService } from 'src/services/auth/auth.service';
import { LocalStorageService } from 'src/services/local-storage/local-storage.service';
import { routerAnimation } from 'src/utils/animation';
import validation from 'src/utils/validation';

type Step = {
  index: number
}


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [routerAnimation],
})
export class AuthComponent {
  outletAnimation: string = 'inRight'

  emailCtrl: FormControl = new FormControl('', [
    validation.createValidatorEmail('Email inválido'),
    validation.createValidatorNullOrEmpty('Campo obrigatório.'),
  ]);

  passCtrl: FormControl = new FormControl('', [
    validation.createValidatorNullOrEmpty('Campo obrigatório.'),
  ]);


  step: Step ={
    index: 0
  }

  constructor(private authService: AuthService, private storage: LocalStorageService, private router: Router, private _snackBar: MatSnackBar) {
  }

  async login(): Promise<void> {
    try {
      let auth: AuthDTO = {
        pass: this.passCtrl.value,
        username: this.emailCtrl.value,
      };
      const token = await this.authService.generateToken(auth)
      this.storage.setItem(LocalStorageEnumType.TOKEN, token.access_token)
      this.router.navigateByUrl('/home')
    } catch (error: any) {
      let message = 'Erro inesperado ao realizar esta opereção'
      if (error && error.error && error.error.message) {
        message = error.error.message
      }
      this.openSnackBar(message, 'Entendi!')
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
