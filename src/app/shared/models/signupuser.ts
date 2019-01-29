import { SignupCategories } from './signupcategories';
import { SafeResourceUrl } from '@angular/platform-browser';

export class SignupUser {
  companyname?: string;
  nif?: string;
  fullaname: string;
  tele: string;
  email: string;
  pass?: string;
  type?: string;
  address?: string;
  postalCode?: string;
  city?: string;
  power?: boolean;
  powerEmail?: string;
  powerName?: string;
  powerDepartment?: string;
  aboutCompany?: string;
  categories?: SignupCategories[] = [];
  otherCategory?: string;
  cargo?: string;
  chosenContact?: string;
  ano?: string;
  anexType?: string;
  sfid?: string;
  anexBody?: SafeResourceUrl;
}
