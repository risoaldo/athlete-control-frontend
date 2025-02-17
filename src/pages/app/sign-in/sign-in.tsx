import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useCallback } from "react";
import { useForm } from "react-hook-form";


import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInForm = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const { register, handleSubmit, formState:  {isSubmitting} } = useForm<SignInForm>({
    resolver: zodResolver(signInForm)
  });

  const handleSignIn = useCallback(async (data: SignInForm) => {
    console.log(data);
    await new Promise((resolver) => setTimeout(resolver, 3000))
  }, []);

  return (
    <div className="p-8">
      <div className="flex w-[350px] flex-col justify-center gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Acessar sistema
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe os atletas da cidade de Icó!
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register("email")} autoComplete="on" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senha">Senha</Label>
            <Input id="password" type="password" {...register("password")} autoComplete="on" />
          </div>

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Acessar sistema
          </Button>
        </form>
      </div>
    </div>
  );
}
