"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth-client";
import { Github, Bot, Loader2 } from "lucide-react";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn.social({
        provider: "github",
        callbackURL: "/",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background p-4">
      <div className="w-full max-w-[320px] flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="p-3 rounded-2xl bg-primary ring-1 ring-primary/20">
            <Bot className="h-8 w-8 text-black " />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to your account
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4">
          <Button
            variant="outline"
            className="w-full h-11 relative overflow-hidden transition-all hover:border-primary/50 hover:bg-muted/50"
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Github className="h-4 w-4 mr-2" />
            )}
            Continue with GitHub
          </Button>
        </div>

        {/* Footer */}
        <p className="px-8 text-center text-xs text-muted-foreground">
          By continuing, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignIn;
