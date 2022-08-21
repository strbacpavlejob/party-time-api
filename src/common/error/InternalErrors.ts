import { HttpCodes } from "../http/codes";
import { ErrorThrowDefinition } from "../types";

export const InternalErrors: Record<string, ErrorThrowDefinition> = {
  BAD_REQUEST: {
    name: "BAD_REQUEST",
    message: "The action you are initiating is not valid!",
    code: 1000,
    httpCode: HttpCodes.BAD_REQUEST,
  },
  UNEXPECTED_ERROR: {
    name: "UNEXPECTED_ERROR",
    message: "Something went wrong.",
    code: 5000,
    httpCode: HttpCodes.SERVER_ERROR,
  },
  SERVER_ERROR: {
    name: "SERVER_ERROR",
    message: "Internal server error",
    httpCode: HttpCodes.SERVER_ERROR,
    code: 5001,
  },
  SYSTEM_ERROR: {
    name: "SYSTEM_ERROR",
    message: "System Error",
    httpCode: HttpCodes.SERVER_ERROR,
    code: 5002,
  },
  NO_CLIENT_SUPPORT_ERROR: {
    name: "NO_CLIENT_SUPPORT_ERROR",
    message: "The feature has no support for the target client",
    httpCode: HttpCodes.FORBIDDEN,
    code: 5003,
  },
  IMPORT_FAILED: {
    name: "IMPORT_FAILED",
    message: "Import of the provided file did fail entirely",
    httpCode: HttpCodes.SERVER_ERROR,
    code: 5004,
  },
  ENTITY_ALREADY_EXISTS: {
    name: "ENTITY_ALREADY_EXISTS",
    message: "Entity already exists",
    httpCode: HttpCodes.BAD_REQUEST,
    code: 5005,
  },
  VALIDATION_FAILED_WHILE_TRANSFORMING_RESPONSE: {
    name: "VALIDATION_FAILED_WHILE_TRANSFORMING_RESPONSE",
    message: "Validation failed while transforming response from partner's api",
    httpCode: HttpCodes.CONFLICT,
    code: 5006,
  },
};
