import ContactUS from "@/components/Home/ContactUS";
import Hero from "@/components/Home/Hero";
import Marqueer from "@/components/Home/Marqueer";
import RecentPosts from "@/components/Home/RecentPosts";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <RecentPosts></RecentPosts>
            <Marqueer></Marqueer>
            <ContactUS></ContactUS>
        </div>
    );
};

export default Home;