import type { IncomingHttpHeaders } from 'http';
import type { BaseContext } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@apollo/server/dist/esm/express4';

export interface Context extends BaseContext {
  headers: IncomingHttpHeaders;
}

export async function createContext({
  req,
}: ExpressContextFunctionArgument): Promise<Context> {
  return {
    headers: req.headers,
  };
}
