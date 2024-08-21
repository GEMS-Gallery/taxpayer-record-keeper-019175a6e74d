import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface TaxPayer {
  'tid' : string,
  'address' : string,
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE {
  'addTaxPayer' : ActorMethod<[string, string, string, string], undefined>,
  'getTaxPayers' : ActorMethod<[], Array<TaxPayer>>,
  'searchTaxPayer' : ActorMethod<[string], [] | [TaxPayer]>,
}
