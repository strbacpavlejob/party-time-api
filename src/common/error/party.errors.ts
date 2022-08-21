import { ErrorThrowDefinition } from '../types';
import { HttpCodes } from '../http/codes';

export const PartyErrors: Record<string, ErrorThrowDefinition> = {
  PARTY_NOT_FOUND: {
    name: 'PARTY_NOT_FOUND',
    message: 'Party is not found',
    code: 2001,
    httpCode: HttpCodes.NOT_FOUND,
  },
};
