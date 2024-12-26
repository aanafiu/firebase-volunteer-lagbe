import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ContactUS = () => {
    return (
        <div data-aos="fade-up" className=" h-full w-[80%] mx-auto p-5 ">
            <Card className="flex flex-col justify-center items-center gap-5 py-5 border-2 border-blue-300 outline-none">
                <h1 className="text-2xl md:text-xl mx-auto w-fit py-4">Contact With US</h1>
                <input type="text" className="w-[80%] text-sm tracking-[5px] border-2 font-bold text-center rounded-lg text-allText p-4 bg-transparent mx-auto outline-none btn-grad placeholder:text-allTextDark focus:outline-blue-500" placeholder="Enter Your Email Address"/>
                <Button variant="destructive">Contact Now</Button>
            </Card>
        </div>
    );
};

export default ContactUS;