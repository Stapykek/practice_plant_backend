import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ParamUser } from '@app/types'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ParamUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as ParamUser;
  },
);