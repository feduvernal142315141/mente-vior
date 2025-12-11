import { QueryPaginationModel } from "../queryPaginationModel";

export interface CatalogResponse {
  id: string;
  name: string;
  code: string;
}

export interface CatalogListResponse {
    entities: CatalogResponse[];
    pagination: QueryPaginationModel;
}