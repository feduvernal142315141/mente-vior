import {QueryPaginationModel} from "@/lib/models/queryPaginationModel";


export interface RequestCreateCompany {
  legalName: string;
  agencyEmail: string;
  phoneNumber: string;
  fax: string;
  webSite: string;
  ein: string;
  npi: string;
  mpi: string;
  taxonomyCode: string;
  logo: string;
  businessAgreement?: string;
  serviceAgreement?: string;
  stateId: string;
  city: string;
  address: string;
  zipCode: string;

  userCompany: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export interface RequestUpdateCompany extends RequestCreateCompany {
  id: string;
}

export interface Organization {
  id: string;
  legalName: string;
  agencyEmail: string;
  phoneNumber: string;
  fax: string;
  webSite: string;
  ein: string;
  npi: string;
  mpi: string;
  taxonomyCode: string;
  logo: string;
  businessAgreement?: string;
  serviceAgreement?: string;
  city: string;
  address: string;
  zipCode: string;
  countryId: string;
  stateId: string;
  active: boolean;

  userCompany: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  };
}

export interface ResponseGetAllCompanies {
  id: string;
  legalName: string;
  logo: string | null;
  active: boolean;
  adminName: string;
  adminEmail: string;
  cantUsers: number;
  cantActiveUsers: number
  createAt: string;
}


export interface CompanyListResponse {
    entities: ResponseGetAllCompanies[];
    pagination: QueryPaginationModel;
}
