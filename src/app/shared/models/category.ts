import { Article } from './article';

export class Category {
  id: string;
  uniqueName: string;
  name: string;
  summary: string;
  icon: string;
  articles: Article[];
}
