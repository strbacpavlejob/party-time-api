import { ErrorThrowDefinition } from '../types';
import { HttpCodes } from '../http/codes';

export const PartyErrors: Record<string, ErrorThrowDefinition> = {
  PARTY_NOT_FOUND: {
    name: 'PARTY_NOT_FOUND',
    message: 'Party is not found',
    code: 2001,
    httpCode: HttpCodes.NOT_FOUND,
  },
  FAVORITE_ACTION_FORBIDDEN: {
    name: 'FAVORITE_ACTION_FORBIDDEN',
    message: 'You cannot favorite the party that you hosted',
    code: 2002,
    httpCode: HttpCodes.FORBIDDEN,
  },
  ATTEND_ACTION_FORBIDDEN: {
    name: 'ATTEND_ACTION_FORBIDDEN',
    message: 'You cannot attend the party that you hosted',
    code: 2003,
    httpCode: HttpCodes.FORBIDDEN,
  },
};
