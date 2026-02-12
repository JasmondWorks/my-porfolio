"use client";

import { login } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Lock } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        "Verifying..."
      ) : (
        <>
          Access Dashboard <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export default function AdminLogin() {
  const [error, setError] = useState("");

  async function clientLogin(formData: FormData) {
    const result = await login(formData);
    if (result?.error) {
      setError(result.error);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4">
      {/* Linear-style minimalist container */}
      <div className="w-full max-w-sm space-y-4">
        <div className="flex justify-center mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
            <Lock className="h-5 w-5" />
          </div>
        </div>

        <Card className="border-border shadow-card hover:shadow-card-hover transition-shadow duration-300">
          <CardHeader className="text-center space-y-1 pb-2">
            <CardTitle className="text-lg font-medium tracking-tight text-foreground-heading">
              Secure Access
            </CardTitle>
            <CardDescription className="text-xs uppercase tracking-wider font-medium text-muted-foreground/80">
              Admin Portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={clientLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  name="pin"
                  placeholder="Enter PIN"
                  required
                  className="text-center text-lg tracking-widest font-mono h-12"
                  maxLength={6}
                />
              </div>
              {error && (
                <div className="rounded-md bg-destructive/10 p-2 text-center text-xs font-medium text-destructive">
                  {error}
                </div>
              )}
              <SubmitButton />
            </form>
          </CardContent>
          <CardFooter className="justify-center border-t border-border/50 py-3">
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Restricted Area
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
