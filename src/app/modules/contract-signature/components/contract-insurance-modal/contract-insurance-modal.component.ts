import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-contract-insurance-modal',
  templateUrl: './contract-insurance-modal.component.html',
  styleUrls: ['./contract-insurance-modal.component.scss']
})
export class ContractInsuranceModalComponent implements OnDestroy {

  insuranceData = [
    {
      heading: '1. OBJETO DO SEGURO',
      text: ['Esta Apólice fornece uma cobertura de seguro para os bens e dados eletrónicos (software) objeto do Contrato ' +
        'de Locação. Os bens e dados eletrónicos (software) são cobertos pela Garantia do Fabricante. As condições gerais da ' +
        'Garantia do Fabricante aplicam-se à cobertura do seguro prestada ao abrigo desta Apólice, com exceção das adiante descritas.']
    },
    {
      heading: '2. COBERTURA',
      text: ['Com exceção dos riscos expressamente excluídos, a cobertura base deste contrato garante todas as perdas ' +
        'e danos verificados nos bens e dados eletrónicos seguros, nomeadamente os danos causados por:',
        '• Incêndio, queda de raio e explosão;',
        '• Fumo, fuligem e gases corrosivos;',
        '• Danos por água e humidade de qualquer espécie;',
        '• Fenómenos da natureza, nomeadamente inundações, enxurradas, ciclones, furacões ou tempestades;',
      '• Efeitos da corrente elétrica, nomeadamente sobretensão e sobreintensidade, incluindo os produzidos pela eletricidade ' +
      'atmosférica, atmosférica, curtos-circuitos, arcos voltaicos ou outros fenómenos semelhantes;',
        '• Dano acidental, previsto e não mencionado nas exclusões;',
        '• Roubo ou furto por arrombamento;',
        '• Aluimentos de terras e derrocadas, desmoronamentos ou deslizamentos de terrenos e edifícios;',
      '• Restauro ou substituição de todos os dados eletrónicos danificados ou perdidos causados por: Vírus eletrónico, ' +
      'pirataria informática ou Hacking/Ciberataques.']
    },
    {
      heading: '3. DEFINIÇÕES',
      text: ['Segurado: Pessoa física ou jurídica que, tendo interesse segurável, contrata um seguro, em seu benefício;',
        'Bens Seguros: Os equipamentos e todos os dados eletrónicos constantes em software devidamente identificados no Auto de Aceitação;',
        'Sinistro: Evento ou série de eventos cujas consequências danosas estão abrangidas pelas Condições Gerais da Apólice.',
        'Co-Pagamento: Montante que deverá ser pago pelo Segurado, em caso da ocorrência de um Sinistro, como contribuição ' +
        'para o custo da cobertura do risco segurado, tanto para reparação como para substituição do Equipamento Segurado.',
        'Garantia do Fabricante: Período relativo à garantia comercial concedido pelos diversos fabricantes de equipamentos;',
        'Prémio: Montante pago pelo Segurado relativo às coberturas incluídas na apólice. Do recibo farão parte agravamentos ' +
        'e impostos legais.']
    },
    {
      heading: '4. EXCLUSÕES',
      text: ['As seguintes situações não são cobertas: Exclusões comuns a todas as coberturas: a) Quando seja possível ' +
        'responsabilizar o Fabricante ou Distribuidor, em virtude de outras garantias, no caso dos bens ou dados eletrónicos/software; ' +
        'b) Se no momento em que se produz o sinistro existir outra ou outras Apólices que cubram o mesmo risco. Nestes casos, ' +
        'só nos responsabilizamos pela parte proporcional que nos corresponda; c) Qualquer prejuízo ou perda financeira sofrida pelo ' +
        'Segurado durante ou depois da ocorrência do sinistro ou danos causados a terceiros em resultado do sinistro; d) Qualquer ' +
        'ato negligente, intencional, fraudulento, ou realizado por má-fé, cometido pelo Segurado ou por qualquer pessoa ligada ' +
        'ao mesmo; e) As consequências de qualquer radiação ionizada ou armas nucleares; f) As consequências de qualquer guerra civil, ' +
        'invasão e/ou actos de terrorismo; g) Fenómenos Sísmicos; h) Consequências directas de influências previsíveis resultantes do ' +
        'funcionamento ou desgaste normal, tais como desgaste, deterioração ou deformação; i) Falhas, defeitos ou Bugs já existentes à ' +
        'data da contratação do seguro e intencionalmente omitidos ao Segurador, tanto de equipamentos como de dados ' +
        'electrónicos/software; j) Falta ou interrupção do fornecimento de energia elétrica, gás ou água.',
      'Exclusões específicas da cobertura aos equipamentos: a) Consumíveis, ferramentas e partes dos equipamentos que necessitem de ser ' +
      'substituídas regularmente; b) Equipamentos ao ar livre, a não ser quando os mesmos tenham sido expressamente concebidos para ' +
      'funcionarem como tal.',
      'Exclusões específicas da cobertura aos dados eletrónicos e/ou software: a) Falhas ou Bugs já existententes à data da ' +
      'contratação do seguro que comprometam a segurança e a proteção dos dados eletrónicos e/ou software contratado; b) Danos ' +
      'causados em dados eletrónicos e/ou software que não sejam considerados indispensáveis para o normal funcionamento do software,' +
      ' independente de estarem ou não alojados no mesmo servidor.',
      'Exclusões específicas da cobertura de roubo e furto por arrombamento: a) O simples desaparecimento do Equipamento Segurado, ' +
      'sem que se comprove que foi empregue o uso de força, de violência ou ameaça de pessoas para a subtração do mesmo, pelo que a ' +
      'prática do ato deverá ser inequivocamente comprovada através de vestígios; b) Subtração ou apropriação ilegítima dos bens, ' +
      'desde que os mesmos se encontrem em locais fechados ou de acesso restrito e a prática do ato possa ser inequivocamente comprovada ' +
      'através de vestígios; c) Qualquer roubo ou furto em que sejam utilizados meios de transporte aéreos, marítimo ou terrestre e que ' +
      'não tenham sido tomadas as devidas precauções para ocultar, vigiar e manter o equipamento sob custódia direta do segurado ou da ' +
      'pessoa que encarrega para a função; d) Qualquer roubo cuja prática seja facilitada pela negligência do Segurado. Para efeitos ' +
      'desta exclusão, será considerada negligência a circunstância de se deixar o Equipamento Seguro num lugar que seja visível do ' +
      'exterior, num veículo, edifício ou lugar público; e) O Roubo ou Furto seja praticado por um conhecido, próximo ao Segurado ' +
      '(cônjuge, companheiro/a, ascendente, descendente, qualquer representante legal ou empregado deste quando o Segurado seja ' +
      'uma pessoa coletiva), ou por qualquer pessoa autorizada pelo Segurado para utilizar o Equipamento Segurado, ' +
      'sendo necessário comprovar inequivocamente através de vestígios.',
      'Exclusões específicas de dano acidental: a) Avarias, falhas ou defeitos relacionados com causas internas, que sejam cobertos ou ' +
      'não pela garantia do fabricante ou distribuidor; b) Avarias, falhas ou defeitos resultantes de qualquer uso e desgaste normal do ' +
      'equipamento, tal como oxidação, deterioração ou deformação independentemente da sua causa; c) Danos causados por um ' +
      'defeito ou vício oculto já existentes no equipamento que se venha a manifestar após a aquisição ou que tenha sido causado ' +
      'no decurso do respectivo processo de fabrico; d) Danos causados às partes externas do Equipamento Seguro quando estes não ' +
      'impeçam o funcionamento adequado do mesmo, designadamente riscos e/ou outro dano puramente estético; e) Danos causados pelo ' +
      'Incumprimento das recomendações ou padrões do Fabricante, ou pela falta de manutenção do Equipamento Seguro e dos seus ' +
      'componentes; f) Instalação, modificação ou manutenção incorreta das tomadas, dos sistemas de eletricidade; g) Interrupção ' +
      'ou cessação dos serviços elétricos por qualquer falha ou ato provocado pelo Segurado, seus familiares ou quaisquer pessoas; ' +
      'h) Dano provocado pelo sol, humidade ou líquidos corrosivos incluindo oxidação e corrosão; i) Custos incorridos para ' +
      'realizar o orçamento de reparação fora da cobertura ou quando a reparação não tenha sido feita por um profissional; j) ' +
      'Custos de reparação pagos pelo Segurado, sem a prévia aprovação da Liqui.do, S.A.; k) Custos de manutenção, revisão, modificação, ' +
      'melhoria ou arranjo do Equipamento Segurado; l) Quando os danos descritos pelo Segurado não correspondam aos danos verificados ' +
      'no equipamento.']
    },
    {
      heading: '5. ÂMBITO DO RISCO',
      text: ['O seguro abrange os equipamentos e dados eletrónicos/software descritos no auto de aceitação, sempre que os mesmos se ' +
        'encontrem montados ou instalados em locais seguros de funcionamento, nomeadamente instruções de código ou informações ' +
        'de software confidenciais Os custos referentes à reparação/substituição dos equipamentos e dados eletrónicos/software ' +
        'têm por base o valor dos mesmos na data da ocorrência do sinistro, ou seja o valor do equipamento ou dados ' +
        'eletrónicos/software em novo deduzindo-se os valores relativos à depreciação natural sofrida pelo equipamento ou dados ' +
        'eletrónicos/software.']
    },
    {
      heading: '6. CO-PAGAMENTO E LIMITES DE INDEMNIZAÇÃO',
      text: ['Por cada sinistro, o Segurado suportará o co-pagamento de seguro fixado de 150,00€ para cada equipamento e/ou dados ' +
        'eletrónicos/ software. A indemnização máxima acumulada de todos os possíveis sinistros será o valor de compra do equipamento ' +
        'e/ou dados eletrónicos/software. Após a liquidação de um sinistro, o capital seguro será automaticamente reduzido na proporção ' +
        'do valor já pago do sinistro anterior.']
    },
    {
      heading: '7. TRAMITAÇÃO DE SINISTRO',
      text: ['O Segurado deverá participar o sinistro à Liqui.do S.A. com a maior brevidade possível, num prazo nunca superior ' +
        'a quinze (15) dias a contar do dia da sua ocorrência. A comunicação deverá ser feita através de correio electrónico dirigido ' +
        'a info@liqui.do ou através do portal do cliente fornecido para o efeito. O Segurado deverá preencher um formulário de sinistro ' +
        'indicando todos os detalhes da ocorrência e anexando documentos de prova caso existam. Em caso de incumprimento na comunicação ' +
        'do sinistro, no preenchimento do formulário ou noutros documentos de prova, poderá ocorrer redução das garantias previstas ou ' +
        'perda das mesmas. Nos casos de Roubo ou Furto o Segurado deverá apresentar queixa às Autoridades Competentes, indicando as ' +
        'circunstâncias da ocorrência e solicitando um documento comprovativo da mesma. No documento deverá constar a indicação expressa ' +
        'de que o Equipamento Segurado foi roubado ou furtado, marca, modelo e número de série do']
    },
    {
      heading: '8. PROVA DE SINISTRO',
      text: ['Para finalizar o processo, o Segurado deverá enviar para o Departamento de Sinistros da Liqui.do, S.A., o formulário ' +
        'do sinistro devidamente preenchido com as indicações específicas das circunstâncias do sinistro. Nos casos de Roubo ou ' +
        'Furto só será considerado como prova o envio de documentação certificada emitida pelas Autoridades Competentes, indicando ' +
        'o roubo ou furto e mencionando o equipamento em causa. Em casos de descargas eléctricas ou problemas relacionados com ' +
        'electricidade só será considerado como prova o envio do relatório técnico da companhia de fornecimento de ' +
        'electricidade (Ex: EDP).']
    },
    {
      heading: '9. PERITAGEM',
      text: ['A Liqui.do, S.A. efetuará as averiguações e peritagens necessárias ao reconhecimento do sinistro e à avaliação dos ' +
        'danos com a adequada prontidão e diligência.']
    },
    {
      heading: '10. CONSEQUÊNCIAS DA FALTA DE PAGAMENTO DO PRÉMIO',
      text: ['Quando na data de ocorrência do sinistro, existam pagamentos do prémio em atraso ou não tenha sido efectuado qualquer ' +
        'pagamento, o contrato não produzirá quaisquer efeitos. Caso o Segurado liquide as prestações não pagas do seguro após a ' +
        'ocorrência do sinistro, o contrato só produzirá efeitos a partir do pagamento, não tendo por isso efeito nas datas da ' +
        'ocorrência do sinistro.']
    },
    {
      heading: '11. CESSAÇÃO DO SEGURO',
      text: ['O Segurado poderá a qualquer momento comunicar à Liqui.do, S.A. que não pretende o seguro contratado ou a continuidade ' +
        'do mesmo. Para que seja anulado será obrigatório o envio do comprovativo da nova apólice contratada onde estejam expressamente ' +
        'mencionados os equipamentos e/ou dados eletrónicos/software contratos e dos quais a Liqui.do S.A. seja beneficiária.']
    }
  ];

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe([Breakpoints.XSmall]);
  constructor(private dialogRef: MatDialogRef<ContractInsuranceModalComponent>,
    private breakpointObserver: BreakpointObserver) { }

  closeModal() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.insuranceData = null;
  }

}
