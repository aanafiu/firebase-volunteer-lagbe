import Hero from "@/components/Home/Hero";
import Marqueer from "@/components/Home/Marqueer";
import RecentPosts from "@/components/Home/RecentPosts";

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <RecentPosts></RecentPosts>
            <Marqueer></Marqueer>
        </div>
    );
};

export default Home;