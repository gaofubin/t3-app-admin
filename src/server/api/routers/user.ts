import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { comparePassword, hashPassword } from "@/lib/utils-shared";
import { loginFormSchema } from "@/lib/validations/user";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (existingUser) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await hashPassword(input.password);

      const newUser = await ctx.db.user.create({
        data: {
          email: input.email,
          password: hashedPassword,
        },
      });

      return {
        id: newUser.id,
        email: newUser.email,
      };
    }),
});
