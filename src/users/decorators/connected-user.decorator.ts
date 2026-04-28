import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ConnectedUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
  (_, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user ?? null,
);
