import {QueryPaginationModel} from "@/lib/models/queryPaginationModel";


// Agreement payload for create/update requests
export interface AgreementPayload {
  name: string;
  content: string; // base64 without header
}

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
  agreements?: AgreementPayload[];
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

// Agreement item as returned from the API
export interface AgreementItem {
  name: string;
  value: string; // URL or base64
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
  agreements?: AgreementItem[] | string[]; // Can be array of objects or URLs
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
