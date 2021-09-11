import container from "../DI/container";
import TYPES from "../DI/types";
import IHttp from "./IHttp";

interface Pagination {
  perPage: number;
  skip: number
}

export interface Params {
  field: string;
  value: string
}

export interface BaseRepo {
  getAll<ItemType>(pagination: Pagination, params?: Params): Promise<{ items: ItemType[], total: number }>;

  getDetail(): string;

  create(): string;

  updated(): string;

  delete(): string;
}

const http = container.get<IHttp>(TYPES.IHttp);

export default class BaseDI implements BaseRepo {
  private endpointUrl: string;
  constructor(contentType: string) {
    this.endpointUrl = `${process.env.REACT_APP_API_URL}/spaces/${process.env.REACT_APP_SPACE_ID}/environments/${process.env.REACT_APP_ENVIROMENT}/entries?content_type=${contentType}&access_token=${process.env.REACT_APP_ACCESS_TOKEN}`
  }

  async getAll<ItemType>(pagination: Pagination, params?: Params): Promise<{ items: ItemType[], total: number }> {
    let search = '';
    if (params && params.field && params.value) {
      search = `&fields.${params.field}[match]=${params.value}`
    }
    return await http.get(
      `${this.endpointUrl}&limit=${pagination.perPage}&skip=${pagination.skip}${search}`
    );
  }

  getDetail(): string {
    return "";
  }

  create(): string {
    return "";
  }

  updated(): string {
    return "";
  }

  delete(): string {
    return "";
  }

}