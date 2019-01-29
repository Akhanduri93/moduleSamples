import { Observable, of } from 'rxjs';
import { Article } from '../../shared/models/article';
import { Category } from '../../shared/models/category';


export class CategoryMockService {
  categories: Category[] = [
    {
      id: '1',
      uniqueName: 'applications',
      name: 'Aplicações',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'aplication',
     // icon: 'receipt',
      articles: []
    },
    {
      id: '2',
      uniqueName: 'insurance',
      name: 'Insurance',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'invoices',
      articles: [
      ]
    },
    {
      id: '3',
      uniqueName: 'assinaturaDigital',
      name: 'Assinatura Digital',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'pen',
      // icon: 'apps',
      articles: [
      ]
    },
    {
      id: '4',
      uniqueName: 'seguro',
      name: 'Seguro',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'securiti',
     // icon: 'apps',
      articles: [
      ]
    },
    {
      id: '5',
      uniqueName: 'faturação',
      name: 'Faturação',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'invoices',
      articles: [
      ]
    },
    {
      id: '6',
      uniqueName: 'geriraConta',
      name: 'Gerir a Conta',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'contracts',
      articles: [
      ]
    },
    {
      id: '7',
      uniqueName: 'contratoeAutoDeAceitação',
      name: 'Contrato e Auto de Aceitação',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'contracts',
      articles: [
      ]
    },
    {
      id: '8',
      uniqueName: 'decisão',
      name: 'Decisão',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
      icon: 'decisions',
      articles: [
      ]
    }
  ];

  getAllCategories(): Observable<Category[]> {
    return of(this.categories.sort(this.compare));
  }
  private compare(a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }
}
