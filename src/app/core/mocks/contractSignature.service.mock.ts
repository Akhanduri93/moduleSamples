import { Client, Equipment, Vendor, Application, Rent, PersonalGuarantee, Signer } from '../../shared/models/contract-signature';
import { of } from '../../../../node_modules/rxjs';

export class ContractSignatureServiceMock {

    ibanTestData = {
        iban: '300 102 232',
        applicationPaymentMethod: 'Direct Debit'
    };

    clientEquipmentInfoModalEmptyTestData = {
        type: 'equipment',
        address: {
            street: '',
            num: '',
            floor: '',
            postalCode: '',
            city: '',
            country: ''
        }
    };

    clientEquipmentInfoModalTestData = {
        type: 'company',
        address: {
            street: 'Rua do Soutelo',
            num: '211',
            floor: '3º Esq.',
            postalCode: '4653-332',
            city: 'Vilar do Torno e Alentém',
            country: 'Portugal'
        }
    };

    contractClientInfoTestData: Client = {
        clientId: '48',
        name: 'A company with a really big name',
        email: 'companyname@candor.pt',
        phoneNumber: '92568452',
        nif: '500 304 237',
        street: 'Rua do Soutelo',
        num: '211',
        floor: '3º Esq.',
        postalCode: '4653-332',
        city: 'Vilar do Torno e Alentém',
        country: 'portugal'
    };

    contractTestIbanData = {
        method: 'Direct Debit',
        escolherChecked: false,
        selectedOption: 'test',
        novoChecked: true,
        iban: 'test',
        description: 'test',
        declaration: true
    };

    contractEquipmentInfoTestData: Equipment = {
        id: '48',
        street: 'Rua da Fonte',
        num: '29',
        floor: '3º Esq.',
        postalCode: '3025-077',
        city: 'Coimbra',
        country: 'Portugal',
    };

    contractProviderInfoTestData: Vendor = {
        providerId: '48',
        name: 'XECSUL Equipamentos e Serviços LDA',
        email: 'companyname@candor.pt',
        mobilephone: '92568452',
        nif: '500 304 342',
        street: 'Rua de São Tomé',
        num: '1114',
        floor: '',
        postalCode: '4653-332',
        city: 'Porto',
        country: 'Portugal'
    };

    contractApplicationInfoTestData: Application = {
        id: 1,
        name: 'AP-12029',
        paymentMethod: 'Direct debit',
        paymentAmount: 0,
        paymentFrequency: 'Quarterly',
        paymentTiming: 'Advanced',
        term: '36'
    };

    contractRentsInfoTestData: Rent = {
        monthly: 0,
        quarterly: 0
    };

    personalGuaranteeTestData: PersonalGuarantee = {
        city: 'Alcochete',
        mobile: '+351234546545',
        name: 'Abreu PESSOAL',
        nif: '123123123',
        postalCode: '3705-213',
        street: 'Rua 29'
    };

    signerTestData: Signer = {
        name: 'Andre Santos',
        phone: '123123131'
    };

    signedTestData = {
        name: 'Andre Santos',
        id: '24057260152',
        date: new Date()
    };

    contractSignatureTestData = {
        success: true,
        data: [{
            application: this.contractApplicationInfoTestData,
            rents: this.contractRentsInfoTestData,
            client: this.contractClientInfoTestData,
            vendor: this.contractProviderInfoTestData,
            declinedReasons: ['Option 1', 'Option 2'],
            personalGuaranteeData: this.personalGuaranteeTestData,
            signer: this.signerTestData
        }]
    };

    contractClauses = [{
        heading: '1. Bens objeto do Contrato. Escolha dos Bens e do Fornecedor. Cláusulas contratuais',
        clauses: [
            '1.1. Para os efeitos do presente Contrato, o termo “Bem” ou “Bens” abrange qualquer coisa móvel']
    }];

    getContractSignatureDetails(id) {
        return of({ response: 'Success' });
    }

    putAddress(requestData, data) {
        return of({ response: 'Success' });
    }

    putIBANData(formData, data) {
        return of({ response: 'Success' });
    }

    changeIbanDeclaration(value) {
        return of({ response: 'Success' });
    }

    setSignedData(value) {
        return of({ response: 'Success' });
    }

    setSignatureFormValues(values) {
        return of({ response: 'Success' });
    }

    addClause(formData) {
        return of({ response: 'Success' });
    }

    getContractValidation(docRecipientId) {
        return of({ response: 'Success' });
    }

    getContractSignaturePageData(docRecipientId) {
        return of(
            {
                application: this.contractApplicationInfoTestData,
                rents: this.contractRentsInfoTestData,
                client: this.contractClientInfoTestData,
                vendor: this.contractProviderInfoTestData,
                declinedReasons: [
                    'Os meus dados estão incorrectos',
                    'Não concordo com as cláusulas do contrato',
                    'Desisti do negócio'
                ],
                personalGuarantee: this.personalGuaranteeTestData,
                signer: this.signerTestData
            }
        );
    }

    postContractSignatureView(ipAddress, docRecipientId) {
        return of({ response: 'Success' });
    }

    postDeclineContractSignature(requestData, data) {
        return of({ response: 'Success' });
    }

    postContractSignData(contact, id) {
        return of({ response: 'Success' });
    }

}
