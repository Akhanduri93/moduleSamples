import { } from 'jasmine';
import { Observable, of } from 'rxjs';
import { CaseAttachment, Case, CaseComment } from '../../shared/models/case';
import { ArticleMockService } from '../../core/mocks/article.service.mock';
import { Article } from '../../shared/models/article';


export class CaseServiceMock {

  articleService = new ArticleMockService();
  articles: Article[] = this.articleService.articles;

  attachmentsType: any = {
    attachs: [
      {
        filename: 'Screen_Shot_2017-08-28_at_14.52.44_(1).jpg',
        fileurl: 'google.com',
      },
      {
        filename: 'Screen_Shot_2017-08-28_at_14.52.44_(1).jpg',
        fileurl: 'google.com'
      },
      {
        filename: 'Screen_Shot_2017-08-28_at_14.52.44_(1).jpg',
        fileurl: 'google.com'
      }]
  };

  attachmentsParsed: CaseAttachment[] =
    [
      {
        filename: 'Screen_Shot_2017-08-28_at_14.52.44_(1).jpg',
        fileurl: ' yoytube.com',
      },
      {
        filename: 'Screen_Shot_2017-08-28_at_14.52.44_(1).jpg',
        fileurl: 'google.com'
      },
      {
        filename: 'Screen_Shot_2017-08-28_at_14.52.44_(1).jpg',
        fileurl: 'google.com'
      }];

  caseComments: CaseComment[] = [{
    id: '00a7E000002rtRAQAY',
    author: 'Joao Gomes',
    createdById: '63738dhw8eu3893',
    createdDate: '2018-02-21T11:56:38.000Z',
    commentBody: 'Um comentário'
  },
  {
    id: '00a7E000002rtRAQAY',
    author: 'Joao Gomes',
    createdById: '63738dhw8eu3893',
    createdDate: '2018-02-21T12:56:38.000Z',
    commentBody: 'Dois comentários'
  },
  {
    id: '00a7E000002rtRAQAY',
    author: 'Joao Gomes',
    createdById: '63738dhw8eu3893',
    createdDate: '2018-02-21T13:56:38.000Z',
    commentBody: 'Três comentários'
  }
  ];
  case: Case =
    {
      type: 'Um tipo',
      category: 'Alterações Contratuais',
      reason: 'Alteração Denominação social',
      message: 'Preencha os campos abaixo com o máximo de detalhe possível para submeter a sua questão diretamente a ' +
        'um dos nossos operadores. Garantimos uma resposta em 15 minutos.',
      id: '5007E000006hrt7QAA',
      caseNumber: '00017118',
      priority: 'High',
      createdDate: '2018-02-21 10:53:55',
      status: 'New',
      attributedTo: 'Célia Pedro',
      contactEmail: 'celia@candor.pt'
    };
  cases: Case[] = [
    {
      id: '5007E000006hrt7QAA',
      caseNumber: '00017112',
      priority: 'High',
      createdDate: '2018-02-21 10:53:55',
      status: 'New',
      attributedTo: 'Célia Pedro',
      type: 'Um tipo',
      category: 'Alterações Contratuais',
      reason: 'Alteração Denominação social',
      message: 'I’s based on a 12 column layout and has multiple tiers.',
      contactEmail: 'celia@candor.pt',
      attachments: this.attachmentsType,
      comments: this.caseComments
    },
    {
      id: '5007E000006hrt7QAAb',
      caseNumber: '00017118',
      priority: 'High',
      createdDate: '2018-02-21 10:53:25',
      status: 'New',
      attributedTo: 'Célia Pedro',
      type: 'Um tipo',
      category: 'Alterações Contratuais',
      reason: 'Alteração Denominação social',
      message: 'I’s based on a 12 column layout and has multiple tiers.',
      contactEmail: 'celia@candor.pt',
      attachments: this.attachmentsType,
      comments: this.caseComments
    }
  ];

  categoryAndReason: any = [
    {
      'category': 'Alterações Contratuais', 'channel': 'Cliente',
      'id': '1',
      'reason': ['Alteração Denominação social', 'Alteração de Número de Contribuinte',
        'Alteração frequência de pagamento (Mensal/Trimestral)', 'Alteração método de pagamento', 'Cessão/Fusão de Empresa']
    },
    {
      'category': 'Antecipação do Término do Contrato', 'channel': 'Cliente',
      'id': '2',
      'reason': ['Cálculo e aceitação do valor a pagar pela antecipação', 'O que é e como se processa',
        'Possibilidade de adquirir equipamento']
    },
    {
      'category': 'Assinatura Digital', 'channel': 'Cliente',
      'id': '3',
      'reason': ['Legalidade e Segurança', 'O que é a Assinatura Digital via DocuSign?', 'Vantagens']
    },
    {
      'category': 'Cessão de Posição Contratual', 'channel': 'Cliente',
      'id': '4',
      'reason': ['Documentos e dados necessários', 'Esclarecimento sobre custos associados',
        'Liquidação de faturas', 'O que é e como se processa']
    },
    {
      'category': 'Contrato', 'channel': 'Cliente',
      'id': '5',
      'reason': ['Cópia do Contrato', 'Reenvio do Contrato', 'Resolução e Cessação do Contrato']
    },
    {
      'category': 'Dados Empresa', 'channel': 'Cliente',
      'id': '6',
      'reason': ['Alteração Contacto Telefónico', 'Alteração de IBAN', 'Alteração Denominação social',
        'Alteração E-mail', 'Alteração Email para Recebimento de Faturas', 'Alteração Morada',
        'Envio Atas/Estatutos/Cert. Permanente/Nº Compromisso/Procuração']
    },
    {
      'category': 'Equipamento/Auto de Aceitação', 'channel': 'Cliente',
      'id': '7',
      'reason': ['Equipamento recebido diferente do contratado', 'Instalação' +
        'recepção e confirmação do equipamento',
        'O número de série do equipamento recebido é diferente do auto de aceitação',
        'Possibilidade de adquirir equipamento']
    },
    {
      'category': 'insurance', 'channel': 'Cliente',
      'id': '8',
      'reason': ['Alteração Denominação social', 'Alteração de Número de Contribuinte',
        'Alteração frequência de pagamento (Mensal/Trimestral)', 'Alteração método de pagamento', 'Cessão/Fusão de Empresa']
    },
  ];

  categoryAndReasonNew: any = [
    {
      'categoryName': 'Alterações Contratuais', 'channel': 'Cliente',
      'id': '1',
      'reasonOfCategory': {'reasons': ['Alteração Denominação social', 'Alteração de Número de Contribuinte',
        'Alteração frequência de pagamento (Mensal/Trimestral)', 'Alteração método de pagamento', 'Cessão/Fusão de Empresa']}
    },
    {
      'categoryName': 'Antecipação do Término do Contrato', 'channel': 'Cliente',
      'id': '2',
      'reasonOfCategory': {'reasons': ['Cálculo e aceitação do valor a pagar pela antecipação', 'O que é e como se processa',
      'Possibilidade de adquirir equipamento']}
    },
    {
      'categoryName': 'Assinatura Digital', 'channel': 'Cliente',
      'id': '3',
      'reasonOfCategory': {'reasons': ['Legalidade e Segurança', 'O que é a Assinatura Digital via DocuSign?', 'Vantagens']}
    },
    {
      'categoryName': 'Cessão de Posição Contratual', 'channel': 'Cliente',
      'id': '4',
      'reasonOfCategory': {'reasons': ['Documentos e dados necessários', 'Esclarecimento sobre custos associados',
      'Liquidação de faturas', 'O que é e como se processa']}
    },
    {
      'categoryName': 'Contrato', 'channel': 'Cliente',
      'id': '5',
      'reasonOfCategory': {'reasons': ['Cópia do Contrato', 'Reenvio do Contrato', 'Resolução e Cessação do Contrato']}
    },
    {
      'categoryName': 'Dados Empresa', 'channel': 'Cliente',
      'id': '6',
      'reasonOfCategory': {'reasons': ['Alteração Contacto Telefónico', 'Alteração de IBAN', 'Alteração Denominação social',
      'Alteração E-mail', 'Alteração Email para Recebimento de Faturas', 'Alteração Morada',
      'Envio Atas/Estatutos/Cert. Permanente/Nº Compromisso/Procuração']}
    },
    {
      'categoryName': 'Equipamento/Auto de Aceitação', 'channel': 'Cliente',
      'id': '7',
      'reasonOfCategory': {'reasons': ['Equipamento recebido diferente do contratado', 'Instalação' +
      'recepção e confirmação do equipamento',
      'O número de série do equipamento recebido é diferente do auto de aceitação',
      'Possibilidade de adquirir equipamento']}
    },
    {
      'categoryName': 'insurance', 'channel': 'Cliente',
      'id': '8',
      'reasonOfCategory': {'reasons': ['Alteração Denominação social', 'Alteração de Número de Contribuinte',
      'Alteração frequência de pagamento (Mensal/Trimestral)', 'Alteração método de pagamento', 'Cessão/Fusão de Empresa']}
    },
  ];
  caseAttachmentTest: CaseAttachment = {
    filename: 'This is a title',
    fileurl: 'a download',
  };
  testMessage = 'This is a message';

  getCasesPayload: any = {
    data:
      [{
        id: 6,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17140',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: '65854562',
        description: 'Uma segunda descricao'
      },
      {
        id: 7,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17120',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 8,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17121',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 9,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17122',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 10,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17123',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 11,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17124',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 12,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17125',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 13,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17126',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 14,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17127',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 15,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17128',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 16,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17129',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      },
      {
        id: 17,
        accountid: '0010E00000KMo0jQAD',
        casenumber: '17130',
        type: 'Dois tipos',
        category__c: 'Duas Categorias',
        reason__c: 'Duas Reason c',
        priority: 'High',
        createddate: '2018-02-21T13:56:38.000Z',
        status: 'New',
        ownerid: 'Celia Pedro',
        description: 'Uma segunda descricao'
      }]
  };
  getCaseByCaseNumberPayload: any = {
    id: 7,
    accountid: '0010E00000KMo0jQAD',
    casenumber: '2151544545',
    type: 'Dois tipos',
    category__c: 'Duas Categorias',
    reason__c: 'Duas Reason c',
    priority: 'High',
    createddate: '2018-02-21T13:56:38.000Z',
    status: 'New',
    ownerid: 'Celia Pedro',
    description: 'Uma segunda descricao'
  };

  getArticlesByCategory(categoryName): Observable<Article[]> {
    if (categoryName === undefined) {
      categoryName = 'insurance';
    }
    const foundArticles: Article[] = [];
    for (const key of Object.keys(this.articles)) {
        if (this.articles[key].categoryName === categoryName) {
          foundArticles.push(this.articles[key]);
        }
    }
    return of(foundArticles);
  }

  getGetCasesPayload() {
    return this.getCasesPayload.data.sort((n1, n2) => {
      if (n1.caseNumber < n2.caseNumber) {
        return 1;
      }
      if (n1.caseNumber > n2.caseNumber) {
        return -1;
      }
      return 0;
    });
  }

  getCaseByCaseId(caseId: String): Observable<Case> {
    if (this.getCaseByCaseNumberPayload) {
      return of(this.getCaseByCaseNumberPayload);
    }
  }

  getCases(): Observable<Case[]> {
    if (this.getCasesPayload) {
      return of(this.parseCasesResults(this.getCasesPayload));
    }
  }

  parseCasesResults(casesRetrieved): Array<Case> {
    const cases = new Array();
    casesRetrieved.data.forEach(function (element) {

      const c = new Case(element['type'], element['category__c'], element['reason__c'], element['description'], element['contactemail']);
      c.id = element['id'];
      c.caseNumber = element['casenumber'];
      c.priority = element['priority'];
      c.createdDate = element['createddate'];
      c.status = element['status'];
      // ver este id no futuro
      c.attributedTo = element['ownerid'];
      // c.attributedTo = 'Célia Pedro';
      cases.push(c);
    }, this);
    return cases;
  }

  getCaseComments(caseId: string): Observable<CaseComment[]> {
    return of(this.caseComments);
  }

  getAttachments(caseId: string): Observable<CaseAttachment[]> {
    return of(this.attachmentsType.attachs);
  }

  sendAttachments(caseId: string, fileObjects: CaseAttachment) {
    return of(true);
  }

  newCaseComment(caseId: string, message: string): Observable<CaseComment[]> {
    if (this.caseComments) {
      this.caseComments.push({
        id: caseId,
        author: 'Joao Gomes',
        createdById: 'suhduihd312234',
        createdDate: '2018-02-21T11:56:38.000Z',
        commentBody: message
      });
    }
    return of(this.caseComments);
  }

  getCategories() {
    return of(this.categoryAndReasonNew);
  }

  postNewCase(receivedCase: Case): Observable<Case> {
    if (this.cases) {
      return of(this.case);
    }
  }

  getCaseMock() {
    return this.case;
  }

  parseCaseResult(caseRetrieved): Case {
    const caseParsed = new Case(caseRetrieved.type, caseRetrieved.category__c,
      caseRetrieved.reason__c, caseRetrieved.description, caseRetrieved.contactemail);
    caseParsed.id = caseRetrieved.id;
    caseParsed.caseNumber = caseRetrieved.casenumber;
    caseParsed.priority = caseRetrieved.priority;
    caseParsed.createdDate = caseRetrieved.createddate;
    caseParsed.status = caseRetrieved.status;
    // ver este id no futuro OWNER ID
    caseParsed.attributedTo = 'Célia Pedro';
    return caseParsed;
  }

  parseAttachments(attachments): Array<CaseAttachment> {
    const casesAttachments = new Array();
    const attachmentsRetrieved = attachments.attachs;
    attachmentsRetrieved.forEach(function (element) {

      const ca = new CaseAttachment(element['filename'], element['filebody']);
      casesAttachments.push(ca);
    }, this);

    return casesAttachments;
  }

  parseCaseComments(caseCommentsPayload): Array<CaseComment> {
    const caseComments = new Array();
    const userName = 'Joao Gomes';
    caseCommentsPayload.caseComments.forEach(function (element) {

      const cc = new CaseComment(element['commentbody']);
      cc.id = element['id'];
      cc.createdDate = element['createddate'];
      cc.author = userName;
      cc.createdById = element['parentid'];
      caseComments.push(cc);
    }, this);

    return caseComments;
  }

}
