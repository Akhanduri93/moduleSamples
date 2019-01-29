import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/internal/operators';
import { concatMap } from 'rxjs/internal/operators';
import { SignupUser } from '../../shared/models/signupuser';
import { Nif, NifContact } from '../../shared/models/nif';

export class SignupServiceMock {
  users: SignupUser[] = [{
    companyname: 'Test',
    fullaname: 'Test Test',
    email: 'test@test.com',
    nif: '123456789',
    pass: '123456789',
    tele: '123456789'
  }];

  testUser: SignupUser = {
    email: 'testing@testing.com',
    pass: '123456',
    companyname: 'Can Can Candor',
    nif: '505934620',
    fullaname: 'testing',
    tele: '123456789',
    type: 'vendor',
    address: 'Rua Mar da China 1, Esc.2.2',
    postalCode: '1234-000',
    city: 'Lisboa',
    power: true,
    powerEmail: 'abc@abc.com',
    powerName: 'test',
    powerDepartment: 'test',
    cargo: 'Director',
    chosenContact: 'Outro',
    otherCategory: 'Test',
    categories: [
      {
        catid: '1',
        catename: 'Computers & Network',
        subcategories: []
      },
      {
        catid: '2',
        catename: 'Communications',
        subcategories: [
          {
            subcatId: '3',
            subcatName: 'Conferencing'
          }
        ]
      },
      {
        catid: '8',
        catename: 'Other',
        subcategories: []
      }
    ]
  };

  nifs: any[] = [
    {
      'taxPayerNumber': '505934620',
      'companyName': 'SOCIEDADE EXEMPLO,LDA',
      'address': 'RUA BARATA SALGUEIRO, 28 3º, 4º E 5º',
      'postalcode': '1234-000',
      'city': 'LISBOA',
      'sfid': '00Q0E00000LjHZEUA3',
      'code': '1',
      'contacts': [
        {
          'firstName': 'Helio',
          'lastName': 'Monteiro',
          'middleName': 'Monica',
          'department': 'GER',
          'description': 'GER',
        },
        {
          'firstName': 'António',
          'lastName': 'Correia',
          'middleName': 'Carlos Mendes',
          'department': 'GER',
          'description': 'GER',
        },
        {
          'firstName': 'António',
          'lastName': 'Correia',
          'middleName': 'Carlos Mendes',
          'department': 'DIRGER',
          'description': 'DIRGER',
        },
        {
          'firstName': 'Helena',
          'lastName': 'Barata',
          'middleName': 'Lúcio Lúcio',
          'department': 'DIRADMFI',
          'description': 'DIRADMFI'
        },
        {
          'firstName': 'Helena',
          'lastName': 'Barata',
          'middleName': 'Lúcio Lúcio',
          'department': 'SOC',
          'description': 'SOC',
        },
        {
          'firstName': 'Helena',
          'lastName': 'Fernandes',
          'middleName': 'Silva e Sousa',
          'department': 'SOC',
          'description': 'SOC'
        }
      ]
    },
    {
      'taxPayerNumber': '222222222',
      'companyName': 'Ban Ban Bandor',
      'address': 'Rua Mar da China 1, Esc.2.2',
      'postalcode': '1234-000',
      'city': 'Lisboa',
      'sfid': '00Q0E00000LjHOIUA3'
    },
    {
      'taxPayerNumber': '333333333',
      'companyName': 'San San Sandor',
      'address': 'Rua Mar da China 1, Esc.2.2',
      'postalcode': '1234-000',
      'city': 'Lisboa',
      'sfid': '00Q0E00000LjHOIUA3'
    },
    {
      'taxPayerNumber': '444444444',
      'companyName': 'Ran Ran Randor',
      'address': 'Rua Mar da China 1, Esc.2.2',
      'postalcode': '1234-000',
      'city': 'Lisboa'
    }
  ];

  validate(nif: String, newUser: SignupUser): Observable<Nif> {
    let nifFound = this.nifs.find(searchedNif => searchedNif['taxPayerNumber'] === nif);
    if (nifFound === undefined) {
      return of(new Nif());
      // return of(new Nif()).pipe(delay(2000));
    } else {
      nifFound = this.parseNif(nifFound);
      return of(nifFound);
      // return of(nifFound).pipe(delay(2000));
    }
  }

  parseNif(element: any) {
    const nif = new Nif();
    nif.companyname = element['companyName'];
    nif.nif = element['taxPayerNumber'];
    nif.city = element['city'];
    nif.address = element['address'];
    nif.postalCode = element['postalcode'];
    nif.sfid = element['sfid'];
    const nifContacts = element['contacts'];
    if (nifContacts && nifContacts.length > 0) {
      nifContacts.forEach((contact, index) => {
        const nifC = new NifContact();
        nifC.department = contact['department'];
        nifC.cargo = contact['description'];
        nifC.name = '';
        // nifC.firstName = contact['firstName'];
        // nifC.lastName = contact['lastName'];
        // nifC.middleName = contact['middleName'];
        // nifC.name = nifC.firstName + ' ' + nifC.middleName + ' ' + nifC.lastName;

        if (contact['firstName'] !== undefined) {
          nifC.firstName = contact['firstName'];
          nifC.name = nifC.name + ' ' + nifC.firstName;
        }

        if (contact['middleName'] !== undefined) {
          nifC.middleName = contact['middleName'];
          nifC.name =  nifC.name + ' ' + nifC.middleName;
        }

        if (contact['lastName'] !== undefined) {
          nifC.lastName = contact['lastName'];
          nifC.name =  nifC.name + ' ' + nifC.lastName;
        }
        if (contact['emai'] === undefined) {
          nifC.email = '';
        }
        nif.contacts.push(nifC);
      });
    }
    return nif;
  }

  registerUser(user: SignupUser): Observable<boolean> {
    const currentUserSize = this.users.length;
    this.users.push(user);

    if (this.users.length > currentUserSize) {
      return of(true);
      // return of(true).pipe(delay(2000));
    } else {
      return of(true);
      // return of(true).pipe(delay(2000));
    }
  }

  checkAlreadyPresentUser(chkUser: SignupUser): Observable<boolean> {
    const userIndex = this.users.findIndex(user => user.email === chkUser.email);
    if (userIndex !== -1) {
      return of(true);
    } else {
      return of(false);
    }
  }

  updateUserNifDetails(nifUserDetail: SignupUser): Observable<boolean> {
    const userIndex = this.users.findIndex(user => user.email === nifUserDetail.email);
    this.users[userIndex].companyname = nifUserDetail.companyname;
    this.users[userIndex].nif = nifUserDetail.nif;
    this.users[userIndex].address = nifUserDetail.address;
    this.users[userIndex].postalCode = nifUserDetail.postalCode;
    this.users[userIndex].city = nifUserDetail.city;
    this.users[userIndex].power = nifUserDetail.power;
    this.users[userIndex].powerName = nifUserDetail.powerName;
    this.users[userIndex].powerEmail = nifUserDetail.powerEmail;

    return of(true);
  }
}
