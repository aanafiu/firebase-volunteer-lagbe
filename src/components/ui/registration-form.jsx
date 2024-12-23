import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Eye, EyeClosed } from "lucide-react";
import { UserContext } from "@/components/Provider/AuthProvider";
import Loader from "@/components/Common/Loader";

export function RegistrationForm({ className, ...props }) {
  const navigate = useNavigate();
  const [eyeBtn, setEyeBtn] = useState(false);
  const handleEye = () => {
    setEyeBtn(!eyeBtn);
  };

  // Notification Error
  const errorNotification = () => {
    Swal.fire({
      title: `Sorry!!`,
      text: "You Have Already An Account",
      icon: "error",
      confirmButtonText: "Go to Login",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(false);
        navigate("/user/login");
      }
    });
  };

  // Password VALIDATION
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const validatePassword = (password) => {
    // Define password validation criteria
    const lengthValid = password.length >= 6;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    // Check all conditions
    if (lengthValid && hasUppercase && hasLowercase) {
      setPasswordValid(true);
      setPasswordMessage("Password is strong");
      return true;
    } else {
      setPasswordValid(false);
      setPasswordMessage("Password must contain: A-Z, a-z, and length >= 6");
      return false;
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    validatePassword(password);
  };

  const {
    registerNewAccount,
    updateDetails,
    setLoading,
    loginGoogle,
    loading,
  } = useContext(UserContext);

  const location = useLocation();
  // console.log(location);

  // Manual Register
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log(name, photo, email, password)

    if (passwordValid || validatePassword(password)) {
      registerNewAccount(email, password)
        .then(() => {
          updateDetails(name, photo).then(() => {
            Swal.fire({
              title: `Welcome ${name}`,
              text: "You Have Successfully Created An Account ",
              icon: "success",
              confirmButtonText: "Continue ",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                // Navigate when "OK" is clicked
                navigate(location.state ? `${location.state}` : "/");
                setTimeout(() => {
                  setLoading(false); // Stop loading after delay
                }, 2000);
              }
            });
          });
        })
        .catch((error) => {
          console.log(error)
          setLoading(false);
          errorNotification();
        })
        .catch((error) => {
          console.log(error)
          setLoading(false);
          errorNotification();
        });
    } else if (!validatePassword(password)) {
      Swal.fire({
        title: "Wrong Password",
        icon: "warning",
        confirmButtonText: "Close",
        allowOutsideClick: false,
      });
    }
  };
// Google Register
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
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate when "OK" is clicked
          setTimeout(() => {
            navigate(location.state ? `${location.state}` : "/");
            setLoading(false); // Stop loading after delay
          }, 2000);
        }
      })
      .catch((error) => {
        setLoading(false);
        errorNotification();
      });
    
    // navigate(location.state ? `${location.state}` : "/");
  };

  if(loading)
  {
    return <Loader></Loader>
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <>
        <CardHeader className="p-0">
          <CardTitle className="text-2xl mx-auto w-fit p-2">
            Register Now!
          </CardTitle>
          <CardDescription className="text-sm md:text-base mx-auto w-fit">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Photo URL</Label>
                <Input
                  id="photo"
                  type="text"
                  placeholder="Photo URL"
                  name="photo"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <button type="button" onClick={handleEye}>
                    {!eyeBtn ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
                <Input
                  id="password"
                  type={eyeBtn ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  onKeyUp={handlePasswordChange}
                  required
                />
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    passwordValid ? "text-navText" : "text-red-500"
                  }`}
                >
                  {passwordMessage}
                </p>
              </div>
              <Button type="submit" className="w-full">
                Register Now!
              </Button>
              <Button onClick={handleGoogle} variant="outline" className="w-full">
                Register Now! with Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link  state={location.state} to="/user/login" className="underline underline-offset-4">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </>
    </div>
  );
}
