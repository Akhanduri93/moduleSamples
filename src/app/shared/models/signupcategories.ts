export class SignupSubCategories {
  subcatId?: string;
  subcatName?: string;
}

export class SignupCategories {
  catid?: string;
  catename?: string;
  subcategories?: SignupSubCategories[] = [];
}
