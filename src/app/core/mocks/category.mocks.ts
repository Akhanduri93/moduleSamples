import { Observable, of } from 'rxjs';
export class CategoryMock {
  categoryList;
  faqList;
  videoList;
  constructor(
  ) { }
   category: any = [
    {
     image: 'assignment',
     title: 'Assinatura Digital',
     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'apps',
        title: 'Aplicações',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'receipt',
        title: 'Contrato e Auto de Aceitação',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'assignment',
        title: 'Faturação',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'receipt',
        title: 'Gerir a Conta',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'apps',
        title: 'Seguro',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
    image: 'assignment',
    title: 'Assinatura Digital',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'apps',
        title: 'Aplicações',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'receipt',
        title: 'Contrato e Auto de Aceitação',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'assignment',
        title: 'Faturação',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'receipt',
        title: 'Gerir a Conta',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'apps',
        title: 'Seguro',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
    image: 'assignment',
    title: 'Assinatura Digital',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'apps',
        title: 'Aplicações',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'receipt',
        title: 'Contrato e Auto de Aceitação',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'assignment',
        title: 'Faturação',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'receipt',
        title: 'Gerir a Conta',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
    {
        image: 'apps',
        title: 'Seguro',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing, sed do eiusmod tempor.'
    },
  ];
  featuredVideo: any = [
      {
        videoURL: 'https://www.youtube.com/embed/yAoLSRbwxL8',
        content: 'Como assinar um contrato de renting'
      },
      {
        videoURL: 'https://www.youtube.com/embed/yAoLSRbwxL8',
        content: 'Como assinar um contrato de renting'
      }
  ];
  getCategoryList(): Observable<[{image: string, title: string, description: string}]> {
    this.categoryList = new Array();
    this.category.forEach(function (element) {
      this.categoryList.push({
        categoryImage: element.image,
        categoryTitle: element.title,
        categoryDescription: element.description
      });
    }, this);
    return of(this.categoryList);
  }

  featuredVideos(): Observable<{ videoURL: string, content: string} > {
    this.videoList = new Array();
    this.featuredVideo.forEach(element => {
        this.videoList.push({
            videoURL: element.videoURL,
            videoContent: element.content
        });
    }, this);
    return of(this.videoList);
      }
}
