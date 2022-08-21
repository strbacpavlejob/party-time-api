import { ErrorThrowDefinition } from "../types";
import { HttpCodes } from "../http/codes";

export const MarketplaceErrors: Record<string, ErrorThrowDefinition> = {
  MARKETPLACE_ALREADY_ACTIVATED: {
    name: "MARKETPLACE_ALREADY_ACTIVATED",
    message: "Marketplace is already activated",
    code: 4001,
    httpCode: HttpCodes.CONFLICT,
  },
  MARKETPLACE_NOT_FOUND: {
    name: "MARKETPLACE_NOT_FOUND",
    message: "Market place is not found",
    code: 4002,
    httpCode: HttpCodes.NOT_FOUND,
  },
  USER_NOT_FOUND: {
    name: "USER_NOT_FOUND",
    message: "User is not found",
    code: 4003,
    httpCode: HttpCodes.NOT_FOUND,
  },
  USER_NOT_ACTIVE: {
    name: "USER_NOT_ACTIVE",
    message: "User is not active",
    code: 4004,
    httpCode: HttpCodes.NOT_ACCEPTABLE,
  },
  SESSION_REJECTED: {
    name: "SESSION_REJECTED",
    message: "Session is rejected",
    code: 4005,
    httpCode: HttpCodes.NOT_ACCEPTABLE,
  },
  SESSION_EXPIRED: {
    name: "SESSION_EXPIRED",
    message: "Session expired",
    code: 4006,
    httpCode: HttpCodes.NOT_ACCEPTABLE,
  },
  SESSION_ALREADY_ACTIVE: {
    name: "SESSION_ALREADY_ACTIVE",
    message: "Session is already active",
    code: 4007,
    httpCode: HttpCodes.CONFLICT,
  },
  SESSION_NOT_FOUND: {
    name: "SESSION_NOT_FOUND",
    message: "Session is not found",
    code: 4008,
    httpCode: HttpCodes.NOT_FOUND,
  },
  SESSION_TERMINATION_FAILED: {
    name: "SESSION_TERMINATION_FAILED",
    message: "Session termination failed",
    code: 4009,
    httpCode: HttpCodes.CONFLICT,
  },
  INSUFFICIENT_BALANCE: {
    name: "INSUFFICIENT_BALANCE",
    message: "Insufficient balance on the account",
    code: 4010,
    httpCode: HttpCodes.BAD_REQUEST,
  },
  LOSS_LIMIT_EXCEEDED: {
    name: "LOSS_LIMIT_EXCEEDED",
    message: "Lost limit is exceeded",
    code: 4011,
    httpCode: HttpCodes.BAD_REQUEST,
  },
  SPEND_LIMIT_EXCEEDED: {
    name: "SPEND_LIMIT_EXCEEDED",
    message: "Spend limit is exceeded",
    code: 4012,
    httpCode: HttpCodes.BAD_REQUEST,
  },
  UNEXPECTED_ERROR: {
    name: "UNEXPECTED_ERROR",
    message: "Unexpected error happened that is not in defined errors list",
    code: 4013,
    httpCode: HttpCodes.BAD_REQUEST,
  },
  MARKETPLACE_ALREADY_EXISTS: {
    name: "MARKETPLACE_ALREADY_EXISTS",
    message: "Marketplace already exists",
    code: 4014,
    httpCode: HttpCodes.CONFLICT,
  },
  MARKETPLACE_ALREADY_DEACTIVATED: {
    name: "MARKETPLACE_ALREADY_DEACTIVATED",
    message: "Marketplace is already deactivated",
    code: 4015,
    httpCode: HttpCodes.CONFLICT,
  },
  MARKETPLACE_NOT_ACTIVE: {
    name: "MARKETPLACE_NOT_ACTIVE",
    message: "Marketplace is not active",
    code: 4016,
    httpCode: HttpCodes.BAD_REQUEST,
  },
  HEALTH_CHECK_ERROR: {
    name: "HEALTH_CHECK_ERROR",
    message: "Health check failed",
    code: 4017,
    httpCode: HttpCodes.BAD_REQUEST,
  },
  INVALID_FINGERPRINT: {
    name: "INVALID_FINGERPRINT",
    message: "Fingerprint validation failed",
    code: 4018,
    httpCode: HttpCodes.BAD_REQUEST,
  },
};
