"use client";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const SignInSchema = z.object({
  email: z.string().email(),
});

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      SignInSchema.parse({ email });
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          toast.error(err.message);
        });
        return;
      }
      throw error;
    }

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    console.log(response);
    setLoading(false);

    if (response?.ok) {
      router.push("/dashboard");
      router.refresh();
      console.log("Redirected to dashboard");
    } else {
      toast.error("Incorrect Username or Password");
    }
  };

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="email"
                className="block text-sm font-bold leading-6 text-primary"
              >
                Email Address
              </Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="block text-sm font-bold leading-6 text-primary"
                >
                  Password
                </Label>
                {/* <div className="text-sm">
                                    <a href="#" className="font-semibold text-black dark:text-white hover:text-red-600">
                                        Forgot password?
                                    </a>
                                </div> */}
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${loading ? "cursor-not-allowed" : ""}`}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
