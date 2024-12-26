import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";


const PostCard = ({ post }) => {
    const deadlineString = post.deadline; // "31/12/2024"
    const [day, month, year] = deadlineString.split("/"); // Split it
    const deadline = new Date(year, month - 1, day); // Convert to Date object
    
    // Now you can use this `deadline` in your logic
    const isActive = deadline > new Date(); // Compare the deadline to the current date
    const deadlineText = isActive
      ? `Deadline: ${formatDistanceToNow(deadline, { addSuffix: true })}`
      : "Deadline Passed";
    
    // console.log(deadlineText);

  return (
    <Card data-aos="fade-down" data-aos-easing="linear" data-aos-duration="1500" className="border w-full p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
      <CardContent className="p-1">
        <div className="mb-4 w-full">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-[250px] object-fill rounded-md"
          />
        </div>
        <p className="dark:text-white font-bold text-xl text-headline mb-3">
          {post.postTitle}
        </p>
        <p className="text-gray-600 mb-3">Category: {post.category}</p>
        <p className="text-gray-500 text-sm mb-2">
          Location: <span className="font-medium"> {post.location}</span>
        </p>
        <p
          className={`text-lg font-bold ${
            isActive ? "text-green-600" : "text-red-600"
          }`}
        >
          {deadlineText}
        </p>
      </CardContent>

      <CardFooter className="flex p-0 m-0 items-center justify-between">
        <Link to={`/posts/${post._id}`} className="transition-all">
          <Button variant="link">View Details</Button>
        </Link>
        <CardHeader className="flex items-center justify-between">
          <Badge
            variant={isActive ? "success" : "destructive"}
            className={`text-sm px-2 py-1 ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </Badge>
        </CardHeader>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
