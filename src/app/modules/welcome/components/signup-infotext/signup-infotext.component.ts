import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-signup-infotext',
  templateUrl: './signup-infotext.component.html',
  styleUrls: ['./signup-infotext.component.scss']
})

export class SignupInfoTextComponent {
  @Input() infoTextFor;
  clientSignupInfoText = [
    {
      icon: '',
      title: 'Receba uma decisão em segundos',
      text: 'Processo automatizado e com algoritmos próprios que eliminam a necessidade de envio de documentos.'
    },
    {
      icon: '',
      title: 'Invista sem comprometer o cash flow',
      text: 'Operação sem entrada inicial, com rendas fixas e fáceis de planear. Tudo 100% dedutível fiscalmente.'
    },
    {
      icon: '',
      title: 'Habitue-se a ouvir “sim” mais vezes',
      text: 'Foco nas necessidades das pequenas e médias empresas. ' +
        'Não falamos a língua da rigidez, ao contrário das soluções financeiras habituais'
    }
  ];

  vendorSignupInfoText = [
    {
      icon: 'schedule',
      title: 'Comece a vender de imediato',
      text: 'Em questão de minutos já pode fechar novos contratos e começar a faturar.'
    },
    {
      icon: 'schedule',
      title: 'Pagamos a sua fatura em algumas horas',
      text: 'Tenha mais capacidade para negociar condições ainda melhores com os seus distribuidores.'
    },
    {
      icon: 'card',
      title: 'Os seus clientes agradecem',
      text: 'Diferencie-se hoje mesmo como o fornecedor com as melhores opções de pagamento.'
    }
  ];
}
