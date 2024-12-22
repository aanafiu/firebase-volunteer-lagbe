import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"

export function RegistrationForm({
  className,
  ...props
}) {
  // console.log("login")
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
    <>
        <CardHeader className="p-0">
          <CardTitle className="text-2xl mx-auto w-fit p-2">Register Now!</CardTitle>
          <CardDescription className="text-sm md:text-base mx-auto w-fit">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Register Now!
              </Button>
              <Button variant="outline" className="w-full">
                Register Now! with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{""}
              <Link to="/user/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </>
    </div>)
  );
}
