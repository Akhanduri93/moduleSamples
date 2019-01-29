import { Pipe, PipeTransform } from '@angular/core';

import { Article } from '../models/article';

@Pipe({
  name: 'byArticleType'
})
export class ByArticleTypePipe implements PipeTransform {
  transform(allArticles: Article[], articleType: string) {
    if (allArticles) {
      return allArticles.filter(article => article.articleType === articleType);
    }
  }
}
