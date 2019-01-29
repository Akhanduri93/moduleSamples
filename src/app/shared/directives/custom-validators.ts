import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  public static passwordMatchValidator(password: string, confirmPassword: string) {
    return (control: AbstractControl) => {
      const currPass = control.get(password).value;
      const newPass = control.get(confirmPassword).value;
      if (currPass !== newPass) {
        control.get(confirmPassword).setErrors({ mismatch: true });
      } else {
        control.get(confirmPassword).setErrors(null);
      }
    };
  }

  public static changeRequired(fieldToCheckName: string, currentValue: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);

      console.log(field.value);

      if (field.value === currentValue) {
        return { 'invalid': true };
      }
    };
  }

  public static phoneNoValidate(fieldToCheckName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const phoneValue = field.value;
      if (phoneValue) {
        if (phoneValue.length < 9) {
          return { 'invalid': true };
        }

        if (phoneValue.length > 13) {
          return { 'invalid': true };
        }

        if (phoneValue.length > 9 && phoneValue.length < 13) {
          return { 'invalid': true };
        }

        if (phoneValue.length === 9) {
          if (isNaN(phoneValue) === true) {
            return { 'invalid': true };
          }

          if (phoneValue[0] === '+' ||
            phoneValue[0] === '-' ||
            phoneValue[0] === '*' ||
            phoneValue[0] === '/') {
            return { 'invalid': true };
          }
        }

        if (phoneValue.length === 13) {
          const phoneNo = phoneValue.substring(1);

          if (isNaN(phoneNo) === true) {
            return { 'invalid': true };
          }

          if (phoneValue[0] !== '+') {
            return { 'invalid': true };
          }
        }
      }
    };
  }

  public static postalCodeValidate(fieldToCheckName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const postalCodeValue = field.value;

      if (postalCodeValue.length < 8) {
        return { 'invalid': true };
      }

      if (postalCodeValue.length > 8) {
        return { 'invalid': true };
      }

      if (postalCodeValue.length === 8) {
        const postalStartNo = postalCodeValue.substring(0, 4);
        const postalSeprator = postalCodeValue.substring(4, 5);
        const postalEnd = postalCodeValue.substring(5, 8);

        if (postalSeprator !== '-') {
          return { 'invalid': true };
        }

        if (isNaN(postalStartNo) === true) {
          return { 'invalid': true };
        }

        if (isNaN(postalEnd) === true) {
          return { 'invalid': true };
        }
      }
    };
  }

  public static nameValidate(fieldToCheckName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const nameValue = field.value;

      if (nameValue.length > 0) {

        const alphabetsOnly = /^[a-zA-Z\u00C0-\u017F ]*$/;

        if (!(nameValue.match(alphabetsOnly))) {
          return { 'invalid': true };
        }
      }
    };
  }

  public static validateEmail(fieldToCheckName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const emailValue = field.value;

      if (emailValue.length > 0) {

        // tslint:disable-next-line:max-line-length
        const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!(emailValue.match(emailPattern))) {
          return { 'invalid': true };
        }
      }
    };
  }

  public static lastNameValidate(fieldToCheckName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const nameValue = field.value;

      const splitedName = nameValue.split(/ (.+)/);
      if (splitedName.length <= 1) {
        return { 'last-name': true };
      }
    };
  }

  public static nifNaoEmailValidate(fieldToCheckName: string, emailToCompare: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const value = field.value;

      if (emailToCompare === value) {
        return { 'invalid': true };
      }
    };
  }

  public static validateNif(fieldToCheckName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }
      const field = control.parent.get(fieldToCheckName);
      const contribuinte = field.value;

      let temErro = 0;
      if (contribuinte.length !== 9) { temErro = 1; }
      if (
        contribuinte.substr(0, 1) !== '1' && // pessoa singular
        contribuinte.substr(0, 1) !== '2' && // pessoa singular
        contribuinte.substr(0, 1) !== '3' && // pessoa singular
        contribuinte.substr(0, 2) !== '45' && // pessoa singular não residente
        contribuinte.substr(0, 1) !== '5' && // pessoa colectiva
        contribuinte.substr(0, 1) !== '6' && // administração pública
        contribuinte.substr(0, 2) !== '70' && // herança indivisa
        contribuinte.substr(0, 2) !== '71' && // pessoa colectiva não residente
        contribuinte.substr(0, 2) !== '72' && // fundos de investimento
        contribuinte.substr(0, 2) !== '77' && // atribuição oficiosa
        contribuinte.substr(0, 2) !== '79' && // regime excepcional
        contribuinte.substr(0, 1) !== '8' && // empresário em nome individual (extinto)
        contribuinte.substr(0, 2) !== '90' && // condominios e sociedades irregulares
        contribuinte.substr(0, 2) !== '91' && // condominios e sociedades irregulares
        contribuinte.substr(0, 2) !== '98' && // não residentes
        contribuinte.substr(0, 2) !== '99' // sociedades civis
      ) { temErro = 1; }

      const check1 = contribuinte.substr(0, 1) * 9;
      const check2 = contribuinte.substr(1, 1) * 8;
      const check3 = contribuinte.substr(2, 1) * 7;
      const check4 = contribuinte.substr(3, 1) * 6;
      const check5 = contribuinte.substr(4, 1) * 5;
      const check6 = contribuinte.substr(5, 1) * 4;
      const check7 = contribuinte.substr(6, 1) * 3;
      const check8 = contribuinte.substr(7, 1) * 2;

      const total = check1 + check2 + check3 + check4 + check5 + check6 + check7 + check8;
      const divisao = total / 11;

      const modulo11 = total - parseInt(divisao.toString(), 0) * 11;
      let comparador;

      if (modulo11 === 1 || modulo11 === 0) { comparador = 0; } else { comparador = 11 - modulo11; }


      const ultimoDigito = contribuinte.substr(8, 1) * 1;
      if (ultimoDigito !== comparador) { temErro = 1; }

      if (temErro === 1) { return { 'invalid': true }; }

    };
  }

  public static nifValidate(fieldToCheckName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const ibanValue = field.value;

      if (ibanValue.length < 9) {
        return { 'invalid': true };
      }

      if (ibanValue.length > 9) {
        return { 'invalid': true };
      }

      if (ibanValue.length === 9) {

        if (isNaN(ibanValue) === true) {
          return { 'invalid': true };
        }
      }
    };
  }

  public static validateIBAN(fieldToCheckName: string): ValidatorFn {
    // A "constant" lookup table of IBAN lengths per country
    const CODE_LENGTHS = {
      AD: 24, AE: 23, AT: 20, AZ: 28, BA: 20, BE: 16, BG: 22, BH: 22, BR: 29,
      CH: 21, CR: 21, CY: 28, CZ: 24, DE: 22, DK: 18, DO: 28, EE: 20, ES: 24,
      FI: 18, FO: 18, FR: 27, GB: 22, GI: 23, GL: 18, GR: 27, GT: 28, HR: 21,
      HU: 28, IE: 22, IL: 23, IS: 26, IT: 27, JO: 30, KW: 30, KZ: 20, LB: 28,
      LI: 21, LT: 20, LU: 20, LV: 21, MC: 27, MD: 24, ME: 22, MK: 19, MR: 27,
      MT: 31, MU: 30, NL: 18, NO: 15, PK: 24, PL: 28, PS: 29, PT: 25, QA: 29,
      RO: 24, RS: 22, SA: 24, SE: 24, SI: 19, SK: 24, SM: 27, TN: 24, TR: 26
    };
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.parent || !control) {
        return null;
      }

      const field = control.parent.get(fieldToCheckName);
      const ibanValue = field.value;
      let iban = ibanValue.toUpperCase().replace(/[^A-Z0-9]/g, ''), // keep only alphanumeric characters
        // tslint:disable-next-line:max-line-length
        match = iban.match(/^([A-Z]{2})(\d{2})(.+)$/),    // match and capture (1) the country code, (2) the check digits, and (3) the rest
        digits;
      // check syntax and length
      if (!match || iban.length !== CODE_LENGTHS[match[1]]) {
        return { 'invalid': true };
      }
      // rearrange country code and check digits, and convert chars to ints
      digits = (match[3] + match[1] + match[2]).replace(/[A-Z]/g, function (letter) {
        return letter.charCodeAt(0) - 55;
      });
      // final check
      if (!(this.mod97(digits) === 1)) {
        return { 'invalid': true };
      }
    };
  }
  // piece-wise mod97 using 9 digit "chunks", as per Wikipedia's example:
  // http://en.wikipedia.org/wiki/International_Bank_Account_Number#Modulo_operation_on_IBAN
  public static mod97(input) {
    let checksum = input.slice(0, 2),
      fragment;

    for (let offset = 2; offset < input.length; offset += 7) {
      fragment = String(checksum) + input.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }

    return checksum;
  }


}
