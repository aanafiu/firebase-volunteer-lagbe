import {RegistrationForm } from "@/components/ui/registration-form";
import Lottie from "lottie-react";
import registrationAnimation from "../../assets/registrationAnimation.json";
import { Card } from "@/components/ui/card";
const Register = () => {
  return (
    <Card className="container mx-auto my-10 p-5">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center md:gap-5">
        <div className="w-full">
          <RegistrationForm/>
        </div>
        <div className="w-full flex items-center justify-center ">
          <Lottie
            animationData={registrationAnimation}
            className="w-[70%] md:w-[100%] object-fill"
          />
        </div>
      </div>
    </Card>
  );
};

export default Register;
