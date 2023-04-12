import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscribable } from 'rxjs';
import { CashFlowDTO, UserDTO } from 'src/models/dto/dto.model';
import { CashFlowService } from 'src/services/cash-flow/cash-flow.service';
import { UserService } from 'src/services/user/user.service';
import validation from 'src/utils/validation';

type Step = {
  index: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  outletAnimation: string = 'inRight'

  operationCtrl: FormControl = new FormControl('', [
    validation.createValidatorNullOrEmpty('Campo obrigatório.'),
  ]);

  valueCtrl: FormControl = new FormControl('', [
    validation.createValidatorNullOrEmpty('Campo obrigatório.'),
  ]);

  loggedUser!: UserDTO;
  loggedUser$: Promise<UserDTO>;

  step: Step ={
    index: 0
  }

  operations:  { key: string; value: string }[] = [
    {
      key: 'INFLOW', value: 'DEPOSITO'
    },
    {
      key: 'OUTFLOW', value: 'SAQUE'
    }
  ]

  constructor(private userService: UserService, private cashFlowService: CashFlowService, private _snackBar: MatSnackBar
    ) {
    this.loggedUser$ = this.userService.getLoggeduser()
   }

  async ngOnInit(): Promise<void> {
    this.loggedUser = await this.loggedUser$
  }

  async submitOperation(): Promise<void> {
   try {
    let cashFlow: CashFlowDTO = {
      value: this.valueCtrl.value,
      operation: this.operationCtrl.value,
      clientId: this.loggedUser.client.id
    };
    const addedCashFlow = await this.cashFlowService.post(cashFlow, '', true)
    this.loggedUser.client.cashFlow.push(addedCashFlow)

    const valueFlow: number = this.valueCtrl.value

    if (this.operationCtrl.value === 'INFLOW') {
      this.loggedUser.client.cash.value += valueFlow
    } else {
      this.loggedUser.client.cash.value -= valueFlow
    }
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
