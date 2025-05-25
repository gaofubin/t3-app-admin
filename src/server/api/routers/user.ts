import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { hashPassword } from "@/lib/utils-shared";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        username: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.user.findUnique({
        where: { username: input.username },
      });

      if (existingUser) {
        throw new Error("User already exists.");
      }

      const hashedPassword = await hashPassword(input.password);

      const newUser = await ctx.db.user.create({
        data: {
          username: input.username,
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
