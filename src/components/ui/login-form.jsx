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
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { UserContext } from "@/components/Provider/AuthProvider"
import { Eye, EyeClosed } from "lucide-react"
import Swal from "sweetalert2"

import Loader from "@/components/Common/Loader"


export function LoginForm({
  className,
  ...props
}) {

  const navigate = useNavigate();
  const { loginUser, setLoading, loading, loginGoogle, setEmail } = useContext(UserContext);
  const [eyeBtn, setEyeBtn] = useState(false);
  const handleEye = () => {
    setEyeBtn(!eyeBtn);
  };
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
    setLoading(true)
    const email = e.target.email.value;
    const password = e.target.password.value;
    loginUser(email, password)
      .then(() => {
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
        })
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        })
      
      })
      .finally(()=>{
        setTimeout(() => {
          setLoading(false); // Stop loading after delay
        }, 3000);
        navigate(location.state ? `${location.state}` : "/");
      })
      .catch((error) => {
        setLoading(false);
        errorNotification();
      })
      
  };


  // Google Login 
  const handleGoogle = (e) => {
    
    e.preventDefault();
    setLoading(true);
    loginGoogle()
      .then(() => {
        
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
        })
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        })

      })
      .finally(()=>{
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

  if(loading)
  {
    return <Loader></Loader>
  }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
   
   <CardHeader className="p-0">
          <CardTitle className="text-2xl mx-auto w-fit p-2">Welcome back</CardTitle>
          <CardDescription className="text-sm md:text-base mx-auto w-fit">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}> 
            <div className="grid gap-6">
              <div>
                <Button onClick={handleGoogle} variant="outline" className="w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 12.48 5.867 .307 5.387.307 12s5.56 12 12.173 12c3.573 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor" />
                  </svg>
                  Login with Google
                </Button>
              </div>
              <div
                className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-neutral-200 dark:after:border-neutral-800">
                <span
                  className="relative z-10 bg-white px-2 text-neutral-500 dark:bg-neutral-950 dark:text-neutral-400">
                  Or continue with
                </span>
              </div>
              
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" name="email" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Password</Label>
                    <button type="button" onClick={handleEye}>
                      {
                        !eyeBtn ? <EyeClosed /> : <Eye />
                      }
                    </button>
                  </div>
                  <Input id="password" type={eyeBtn ? "text" : "password"}
              placeholder="Password"
              name="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{""}
                <Link state={location.state} to="/user/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>

    </div>)
  );
}
