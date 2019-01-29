import { Breadcrumb } from './breadcrumb';
export class Article {
  id: string;
  urlName: string;
  channel: string;
  language: string;
  title: string;
  summary: string;
  body: string;
  categoryName: string;
  articleType: string;
  breadcrumbs: Breadcrumb[];
  categoryDetail?:string;
}

export class Video extends Article {
  defaultThumb: string;
  mqDefaultThumb: string;
  hqDefaultThumb: string;
  maxresDefaultThumb: string;
}
