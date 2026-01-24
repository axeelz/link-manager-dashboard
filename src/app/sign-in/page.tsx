import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import ErrorMessage from "@/app/sign-in/error-message";
import { authOptions } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default async function LoginForm() {
  const session = await getServerSession(authOptions);
  const cookieStore = await cookies();

  if (session) {
    redirect("/dashboard");
  }

  const csrfTokenCookie = `${process.env.NODE_ENV == "production" ? "__Host-" : ""}next-auth.csrf-token`;
  const csrfToken = cookieStore.get(csrfTokenCookie)?.value.split("|")[0];

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50">
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>Enter the password to access the dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input name="password" id="password" type="password" />
            </div>
            <ErrorMessage />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </main>
  );
}
