import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-contract-clauses',
  templateUrl: './contract-clauses.component.html',
  styleUrls: ['./contract-clauses.component.scss']
})
export class ContractClausesComponent implements OnDestroy {

  contractClauses = [{
    heading: '1. Bens objeto do Contrato. Escolha dos Bens e do Fornecedor. Cláusulas contratuais',
    clauses: [
        '1.1. Para os efeitos do presente Contrato, o termo “Bem” ou “Bens” abrange qualquer coisa móvel, ou seja, ' +
        'tudo aquilo que pode ser objeto de relações jurídicas, nomeadamente, qualquer equipamento, máquina, componente' +
        ' ou acessório, equipamento informático (hardware e/ou software, incluindo respetivas licenças, manuais de utilização' +
        ' e cabos, ou outros acessórios entregues pelo Fornecedor), objeto do presente Contrato conforme descrito na Secção II.',
        '1.2. O(s) bem(bens) objeto do presente Contrato encontram-se identificados em documento anexo ao contrato, designado' +
        ' por Auto de Aceitação - Confirmação de Entrega.',
        '1.3. O Cliente escolheu livremente os bens que pretende utilizar, tendo selecionado o Fornecedor por si pretendido,' +
        ' comunicando essa informação à Liqui.do, e comprometendo-se a pagar os alugueres acordados.',
        '1.4. O Cliente declara conhecer que a Liqui.do contactou o Fornecedor transmitindo a informação relativa aos bens ' +
        'a disponibilizar ao Cliente, tendo a Liqui.do adquirido os bens escolhidos pelo Cliente e pago o respetivo preço ao ' +
        'Fornecedor, comprometendo-se pelo presente Contrato e nos termos do mesmo a alugá-los ao Cliente.',
        '1.5. O Fornecedor é total e juridicamente independente da Liqui.do e não representa a Liqui.do nem poderá alterar as ' +
        'presentes cláusulas contratuais, as quais prevalecerão sobre qualquer informação transmitida pelo Fornecedor.']
},
{
    heading: '2. Entrega, instalação dos bens e assistência técnica',
    clauses: [
        '2.1. O Fornecedor assinará o Auto de Aceitação - Confirmação de Entrega que consiste numa declaração ' +
        'de confirmação de receção e/ou entrega dos bens, declarando que os mesmos foram entregues pelo Fornecedor, ' +
        'estão instalados e a funcionar, facto que poderá ser confirmado pela Liqui.do nas instalações do Cliente.',
        '2.2. O Cliente declara que está consciente de que a assistência técnica, a manutenção ou a reparação dos bens ' +
        'é da responsabilidade do Cliente, que tratará diretamente com o Fornecedor de todas as questões sobre o funcionamento ' +
        'dos bens, e caso o Fornecedor deixe de existir ou de prestar assistência, diligenciará junto de profissionais pela ' +
        'reparação e manutenção dos bens, mais declarando manter a Liqui.do isenta de qualquer responsabilidade que possa relacionar-se ' +
        'com o uso, assistência técnica, manutenção ou reparação dos bens.',
        '2.3. A Liqui.do transfere para o Cliente os direitos de garantia dos bens, por forma a que o Cliente possa diretamente junto do ' +
        'Fornecedor denunciar eventuais defeitos que não sejam visíveis à data da entrega e/ou instalação dos bens e reclamar os seus ' +
        'direitos junto deste. O Cliente deverá resolver qualquer disputa referente aos bens e ao seu funcionamento diretamente com ' +
        'o Fornecedor.'
    ]
},
{
  heading: '3. Início, duração, renovação e cessação antecipada',
  clauses: [
      '3.1. O Contrato tem início na data da receção dos bens, vigorando pelo prazo acordado, renovável automaticamente ' +
      'por sucessivos períodos de 12 meses, exceto se alguma das partes denunciar o mesmo por carta registada com a ' +
      'antecedência mínima de 30 (trinta) dias sobre a data da renovação.',
      '3.2. As partes poderão resolver o presente Contrato em caso de incumprimento pela outra parte de alguma obrigação ' +
      'prevista neste Contrato.',
      '3.3. A cessação antecipada do contrato implica em qualquer circunstância, a título de cláusula penal, a obrigação de ' +
      'pagamento pelo Cliente dos alugueres correspondentes ao período de duração inicial do contrato, tendo em vista compensar ' +
      'a Liqui.do pelo investimento efetuado com a aquisição e disponibilização dos Bens ao Cliente.',
      '3.4. Em caso de renovação do contrato, mantêm-se em vigor todas as suas presentes cláusulas, sendo devidos pelo Cliente à ' +
      'Liqui.do os alugueres até à efetiva restituição dos bens pelo Cliente à Liqui.do. ',
      '3.5. Salvo acordo escrito em contrário, o valor do aluguer mensal, acrescido do IVA à taxa legal, manter-se-á igual nos ' +
      'períodos de renovação do contrato.'
  ]
},
{
  heading: '4. Obrigações do Cliente',
  clauses: [
      '4.1. O Cliente obriga-se a pagar à Liqui.do os alugueres devidos em virtude da celebração do presente contrato, a obter ' +
      'todas as licenças e consumíveis necessários à utilização dos Bens, bem como a suportar os custos de manutenção e reparação destes.',
      '4.2. O Cliente aceita que os Bens se destinem a uso comercial ou profissional, e não para fins pessoais, reconhecendo que não é ' +
      'consumidor e que não lhe são aplicáveis as leis de proteção do Consumidor.',
      '4.3. Os bens ou equipamentos destinam-se a ser utilizados no endereço do Cliente indicado neste Contrato, pelo que o Cliente ' +
      'deverá comunicar por escrito à Liqui.do qualquer alteração do endereço da localização dos bens.',
      '4.4. O Cliente não pode ceder a sua posição contratual ou sublocar, salvo autorização prévia por escrito da Liqui.do. Em caso ' +
      'de cessão de posição contratual de Locatário autorizada, esta cessão importa um custo de €75,00 (+IVA) que deverá ser suportado ' +
      'pelo Cliente e pago à Liqui.do.',
      '4.5. O Cliente não adquire através do presente Contrato, nem terá direito a adquirir, a propriedade dos Bens objeto do Contrato.',
      '4.6. O Cliente obriga-se a restituir por sua conta e risco os Bens à Liqui.do, nos termos da cláusula 10, alínea a) deste Contrato.',
      '4.7. Caso o Cliente não restitua os Bens, a Liqui.do poderá diligenciar pelo seu levantamento, ficando o Cliente obrigado a ' +
      'reembolsar a Liqui.do pelas despesas e custos incorridos com o levantamento e restituição.'
  ]
},
{
  heading: '5. Dever de contratar seguro para os bens locados',
  clauses: [
      '5.1. O Cliente tem o dever de contratar e manter os Bens protegidos por seguro contra todos os riscos de perda, incluindo os ' +
      'riscos elétricos, num montante igual ao custo de reposição dos bens, devendo a Liqui.do ser indicada como beneficiária do ' +
      'mesmo seguro.',
      '5.2. Caso o Cliente não apresente prova da contratação de apólice de seguro no prazo de 30 (trinta) dias após celebração ' +
      'do Contrato, a Liqui.do tem direito a incluir os Bens na apólice de que seja tomadora e cobrar ao Cliente o prémio de ' +
      'seguro correspondente.',
      '5.3. O Cliente poderá, a qualquer momento por referência ao período vincendo, comunicar à Liqui.do que pretende excluir ' +
      'os bens locados da apólice de seguro da Liqui.do, para que deixe de ser cobrado ou exigível o prémio do seguro referido ' +
      'nos números anteriores e com efeitos para o futuro, devendo nesta circunstância entregar à Liqui.do comprovativo de novo ' +
      'seguro contratado para os Bens, do qual a Liqui.do seja beneficiária e garantindo que os Bens estejam sem qualquer ' +
      'interregno segurados nos termos da presente cláusula.',
      '5.4. O Cliente que pretender acionar o seguro terá que proceder previamente ao pagamento da franquia correspondente ' +
      'a €150,00 (+IVA).'
  ]
},
{
  heading: '6. Pagamento dos alugueres',
  clauses: [
      '6.1. Os pagamentos à Liqui.do poderão ser realizados através de referência Multibanco (com um custo adicional de ' +
      '€2.75 (+IVA) por fatura) ou por débito direto.',
      '6.2. O Cliente autoriza desde já que os pagamentos sejam efetuados através de débito direto na conta bancária com ' +
      'o IBAN indicado no Auto de Aceitação - Confirmação de Entrega. Nos casos em que o débito direto seja cancelado ou ' +
      'rejeitado, o pagamento dos alugueres e demais quantias previstas no contrato será feito por multibanco através das ' +
      'referências constantes da fatura, o que implicará um custo acrescido por aviso de cobrança de €2.75 (+IVA).',
      '6.3. O cliente obriga-se a pagar à Liqui.do o proporcional do aluguer, correspondente a 1/30 do aluguer mensal, ' +
      'desde a data de recepção dos bens até ao último dia do respectivo mês ou trimestre, consoante tenha sido ajustado ' +
      'o pagamento mensal ou trimestral. Os alugueres ajustados são devidos pelo Cliente à Liqui.do e vencem-se antecipadamente ' +
      'no dia 1 do mês a que dizem respeito ou no caso de ter sido acordado o pagamento trimestral no primeiro dia do ' +
      'trimestre a que dizem respeito. ',
      '6.4. Em caso de mora de qualquer quantia devida são devidos pelo Cliente à Liqui.do juros de mora à taxa convencionada, ' +
      'correspondente à taxa legal para operações comerciais acrescida de 15%.',
      '6.5. Sempre que a Liqui.do, ou mandatário por si designado, enviem quaisquer avisos ou interpelações ao Cliente, por ' +
      'falta de pagamento, este obriga-se a pagar €25,00 (+IVA) no 1.º aviso ou interpelação e €90,00 (+IVA) em eventual 2.º ' +
      'aviso ou interpelação, acrescendo estes valores ao montante em dívida e juros de mora.',
      '6.6. O Cliente obriga-se a pagar €25,00 (+IVA), quando, tendo existindo autorização de débito direto, o mesmo não se ' +
      'concretize, seja por falta de provisão, seja se for devolvido ou rejeitado.'
  ]
},
{
  heading: '7. Atualização de Alugueres',
  clauses: [
      '7.1. A Liqui.do reserva-se o direito e a faculdade de em qualquer momento proceder à atualização dos alugueres que sejam devidos ' +
      'nos termos deste Contrato e das Condições Especiais que sejam acordadas entre a Liqui.do e o Cliente, bastando para o efeito, ' +
      'o envio de uma comunicação com a antecedência mínima de 30 (trinta) dias em relação à data em que a pretendida alteração deva ' +
      'entrar em vigor, não devendo essas alterações ultrapassar a taxa do índice de inflação publicado pelo INE, sem prejuízo do ' +
      'número seguinte.',
      '7.2. Se a atualização promovida nos termos da Cláusula 7.1. for realizada em percentagem superior ao índice da inflação, ' +
      'o Cliente poderá reclamar da percentagem aplicada no aumento, mediante carta registada com aviso de receção, dentro do prazo ' +
      'de 15 (quinze) dias a contar da data da receção da comunicação prevista na referida Cláusula, considerando-se aceite caso não ' +
      'seja recebida qualquer reclamação até ao termo do referido prazo.'
  ]
},
{
  heading: '8. Resolução do Contrato',
  clauses: [
     '8.1. Ambas as partes têm o direito de resolver imediatamente e a todo o tempo, o presente Contrato sempre que ocorra uma situação ' +
     'de incumprimento definitivo das obrigações previstas neste Contrato.',
     '8.2. Constitui incumprimento definitivo, nomeadamente: ',
     'a) a falta de pagamento de 3 alugueres mensais ou 2 alugueres trimestrais; ',
     'b) em caso de trespasse, cessão de exploração, transferência e encerramento do estabelecimento comercial ou industrial em que se ' +
     'encontrar instalado o bem ou a cuja atividade o bem se encontre adstrito;',
     'c) Falsidade, inexatidão, desconformidade ou omissão de qualquer comunicação ou documento fornecido pelo Cliente que coloquem em ' +
     'causa a confiança da Liqui.do no Cliente ou aumentem para a Liqui.do o risco de cobrança dos alugueres ou de desaparecimento ' +
     'dos bens;',
     'd) Interrupção da atividade do Cliente por prazo superior a 3 meses;',
     'e) Apreensão judicial de bens do Cliente;',
     'f ) Cisão, fusão, liquidação ou dissolução do Cliente;',
     'g) Instauração de Processo de Revitalização ou de Insolvência do Cliente, ou qualquer situação que possa fundamentar pedido de ' +
     'declaração de insolvência do Cliente que indicie ou diminua as garantias de cumprimento do contrato por parte do Cliente.',
     '8.3 A resolução do Contrato por incumprimento confere ainda à Liqui.do o direito a receber, além dos alugueres e prémios de seguro ' +
     'vencidos, juros de mora e custos de avisos e de não concretização do débito direto, os alugueres vincendos até ao termo da duração ' +
     'inicial do Contrato nos termos da cláusula 3.3..',
     '8.4. A resolução do Contrato constitui o Cliente no dever de restituir imediatamente os bens à Liqui.do, nos termos da ' +
     'cláusula 10, alínea a).',
     '8.5. Para os efeitos da cláusula 8.2., após as interpelações mencionadas na cláusula 6.5., o Cliente apenas poderá sanar ' +
     'o direito de resolução do Contrato por incumprimento se proceder ao pagamento dos alugueres vencidos até à data do pagamento, ' +
     'acrescidos de 50% do montante em dívida, e dos prémios de seguro vencidos e demais custos.'
  ]
},
{
  heading: '9. Oposição à Renovação e denúncia do Contrato',
  clauses: [
     '9.1. A Parte que pretenda opor-se à renovação do contrato poderá denunciá-lo, comunicando esta intenção à outra ' +
     'por carta registada com aviso de receção, respeitando o pré-aviso de 30 (trinta) dias sobre a data do termo inicial ' +
     'ou do termo das renovações automáticas subsequentes.',
     '9.2. As Partes podem acordar por escrito, períodos e condições diferentes das previstas na cláusula 3.1. para ' +
     'renovação do Contrato, desde que o façam por escrito, em Aditamento ao Contrato, podendo, até 30 (trinta) dias ' +
     'anteriores ao termo do período de duração inicial do Contrato, a Liqui.do apresentar propostas neste sentido.'
  ]
},
{
  heading: '10. Cessação do Contrato',
  clauses: [
     'A cessação do contrato, seja por resolução, denúncia ou qualquer outra forma legalmente prevista, determina as ' +
     'seguintes obrigações para o Cliente:',
     'a) Restituição, por sua conta e risco, dos bens ou equipamentos à Liqui.do, em bom estado de conservação, ' +
     'considerando o normal desgaste de uma prudente utilização, para a morada da sede da Liqui.do, ou outra que ' +
     'venha a ser indicada posteriormente por escrito, ficando designadamente responsável por reembolsar a ' +
     'Liqui.do pelos custos necessários à reparação dos bens restituídos que se encontrem danificados. ' +
     'A Liqui.do enviará ao Cliente orçamento para a reparação dos bens restituídos que se encontrem ' +
     'danificados, tendo o Cliente o prazo de 10 dias para pagar a reparação ou apresentar solução para ' +
     'reparação alternativa. Em caso de omissão de resposta ou pagamento, a Liqui.do dará ordem de reparação ' +
     'e emitirá ao Cliente a fatura para o reembolso do custo da reparação constante do orçamento.',
     'b) Pagamento das quantias vencidas e que sejam devidas;',
     'c) Caso o Cliente se atrase a restituir os Bens à Liqui.do por período superior a 10 dias após a cessação do ' +
     'Contrato, o Cliente pagará uma compensação calculada com base no montante que seria devido a título de alugueres ' +
     'como se o contrato se encontrasse em vigor na proporção do período temporal até à efetiva restituição, e, em caso ' +
     'de mora no pagamento dos alugueres, o Cliente deverá pagar o dobro do valor do aluguer mensal ou o seu proporcional diário.'
  ]
},
{
  heading: '11. Cessão da posição de Locador',
  clauses: [
     'O Cliente aceita que a Liqui.do poderá ceder a sua posição como locadora no presente contrato, através da venda dos ' +
     'bens locados, bastando para tal mera comunicação por escrito ao Cliente.'
  ]
},
{
  heading: '12. Domicílio convencionado',
  clauses: [
     'As moradas da Liqui.do e do Cliente indicadas no contrato constituem domicílios convencionados para todos os efeitos ' +
     'legais, devendo qualquer alteração a estas ser comunicada por escrito.'
  ]
},
{
  heading: '13. Tratamento de Dados Pessoais',
  clauses: [
     'A Liqui.do é responsável pelo tratamento dos dados pessoais do Cliente. O Cliente dá o seu expresso consentimento para ' +
     'que a Liqui.do armazene e trate os seus dados pessoais, fornecidos de forma confidencial e exclusivamente para assegurar ' +
     'o cumprimento das obrigações legais e contratuais decorrentes da execução do presente Contrato do qual o Cliente é parte, ' +
     'podendo ser transmitidos a entidades subcontratadas para os referidos efeitos. É garantido ao Cliente o direito de acesso, ' +
     'retificação, apagamento, limitação, e portabilidade dos seus dados pessoais, nos termos da legislação em vigor, e da ' +
     'Política de Proteção de Dados que poderá ser consultada no site www.liqui.do. O Cliente tem direito a retirar o seu ' +
     'consentimento a qualquer momento, ainda que o mesmo não seja fundamento único deste Contrato. Os dados pessoais do ' +
     'Cliente serão conservados pelo prazo de prescrição das obrigações decorrentes do presente contrato. Qualquer ' +
     'disposição não prevista na presente cláusula regular-se-á pela legislação em vigor, bem como pela “Política de Proteção ' +
     'de Dados Pessoais”, na versão [1.0/2018] disponível em https://liqui.do/politica-de-privacidade/ que o Cliente declara ' +
     'expressamente ter lido, consultado e tomado conhecimento. O Cliente reconhece que os dados recolhidos são necessários ' +
     'para a celebração e execução deste Contrato, pelo que o não fornecimento dos mesmos não permitirá a celebração ' +
     'e execução do mesmo.'
  ]
},
{
  heading: '14. Formalização do Contrato por Via Eletrónica',
  clauses: [
     '14.1. A Liqui.do e o Cliente acordam em celebrar o contrato de locação por via eletrónica, podendo as Partes, a todo o tempo, ' +
     'aceder, consultar e imprimir o Contrato.',
     '14.2 O custo de celebração do contrato por via eletrónica é de €75,00 (+IVA), a pagar pelo Cliente à Liqui.do dentro do mês ' +
     'seguinte à receção dos bens.'
  ]
},
{
  heading: '15. Envio de Faturas. Custos de Alterações de Identificação do Cliente no Contrato',
  clauses: [
     '15.1. As faturas serão enviadas por correio eletrónico para o endereço de email indicado do Cliente.',
     '15.2. A alteração do endereço de correio eletrónico terá que ser comunicada pelo Cliente à Liqui.do, para que produza efeitos.',
     '15.3 Caso o Cliente pretenda o envio das faturas impressas por correio postal, deverá expressamente solicitá-lo, suportando um ' +
     'custo acrescido de €10,00 (+IVA) por fatura.',
     '15.4. As faturas, avisos ou interpelações para pagamento e comunicação de resolução, serão enviadas por correio eletrónico ' +
     'para o endereço de e-mail indicado como sendo do Cliente, sem prejuízo de poder ser enviado por correio postal, quando para ' +
     'tal for solicitado.'
  ]
}
];

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall]);
  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnDestroy() {
    this.contractClauses = null;
  }

}
