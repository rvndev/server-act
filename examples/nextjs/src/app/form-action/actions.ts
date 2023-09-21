'use server';

import {serverAct} from 'server-act';
import {z} from 'zod';

const requestTimeMiddleware = () => {
  return {
    requestTime: new Date(),
  };
};

export const sayHelloAction = serverAct
  .middleware(requestTimeMiddleware)
  .input(
    z.object({
      name: z
        .string({required_error: `You haven't told me your name`})
        .nonempty({message: 'You need to tell me your name!'}),
    }),
  )
  .experimental_formAction(async ({input, formErrors, ctx}) => {
    if (formErrors) return {success: false as const, formErrors};
    console.log(`Someone say hi from the client at ${ctx.requestTime.toTimeString()}!`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {success: true as const, message: `Hello, ${input.name}!`};
  });
