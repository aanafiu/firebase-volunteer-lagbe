import { LoginForm } from "@/components/ui/login-form";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/LoginAnimation.json";
import { Card } from "@/components/ui/card";
const Login = () => {
  return (
    <Card className="container mx-auto my-10 p-5">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center md:gap-5">
        <div className="w-full">
          <LoginForm></LoginForm>
        </div>
        <div className="w-full flex items-center justify-center ">
          <Lottie
            animationData={loginAnimation}
            className="w-[70%] md:w-[100%] object-fill"
          />
        </div>
      </div>
    </Card>
  );
};

export default Login;
