import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/components/Provider/AuthProvider";
import { CircleArrowRight, Eye, EyeClosed } from "lucide-react";
import Swal from "sweetalert2";

import Loader from "@/components/Common/Loader";
import axios from "axios";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const { loginUser, setLoading, loading, loginGoogle, user } = useContext(UserContext);
  const [eyeBtn, setEyeBtn] = useState(false);
  const handleEye = () => {
    setEyeBtn(!eyeBtn);
  };

  useEffect(()=>{
    if(user || user?.email)
    {
      navigate("/")
    }},[user, navigate])
  
  // Notification Error

  const errorNotification = () => {
    Swal.fire({
      title: `Sorry!!`,
      text: "Information Wrong",
      icon: "error",
      confirmButtonText: "Try Again",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/user/login");
      }
    });
  };
  const location = useLocation();

  // Login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
        const user = {email:email}
        axios.post("https://backend-volunteer-lagbe.vercel.app/jwt", user,{withCredentials:true})
        .then(res=>{
          // console.log(res.data);
        })
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false); // Stop loading after delay
        }, 3000);
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((error) => {
        setLoading(false);
        errorNotification();
      });
  };

  // Google Login
  const handleGoogle = (e) => {
    e.preventDefault();
    setLoading(true);
    loginGoogle()
      .then(() => {
        const user = {email:email}
        axios.post("https://backend-volunteer-lagbe.vercel.app/jwt", user,{withCredentials:true})
        .then(res=>{
          // console.log(res.data);
        })
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false); // Stop loading after delay
        }, 3000);
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((error) => {
        setLoading(false);
        errorNotification();
      });
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <CardHeader className="p-0">
        <CardTitle className="text-2xl mx-auto w-fit p-2">
          Welcome back
        </CardTitle>
        <CardDescription className="text-sm md:text-base mx-auto w-fit">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid gap-6">
            <div>
              <Button
                onClick={handleGoogle}
                variant="destructive"
                className="w-full"
              >
                Login with Google
                <CircleArrowRight color="#ffffff" strokeWidth={1.75} />
              </Button>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-neutral-200 dark:after:border-neutral-800">
              <span className="relative z-10 bg-white px-2 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
                Or continue with
              </span>
            </div>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  name="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <div type="button"
                    className="w-fit h-fit"
                    onClick={handleEye}
                  >
                    {!eyeBtn ? (
                      <EyeClosed size={24} strokeWidth={1.5} absoluteStrokeWidth/>
                    ) : (
                      <Eye size={24} strokeWidth={1.5} absoluteStrokeWidth />
                    )}
                  </div>
                </div>
                <Input
                  id="password"
                  type={eyeBtn ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
              </div>
              <Button type="submit" variant="destructive" className="w-full">
                Login<CircleArrowRight color="#ffffff" strokeWidth={1.75} />
              </Button>
            </div>
            <div className="text-center text-sm">
              Don&apos;t have an account?{""}
              <Link
                state={location.state}
                to="/user/register"
                className="underline underline-offset-4 hover:text-green-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
