import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"; 
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";

const PostCard = ({ post }) => {
  const isActive = new Date(post.deadline) > new Date();
  const deadlineText = isActive
    ? `Deadline: ${formatDistanceToNow(new Date(post.deadline), { addSuffix: true })}`
    : "Deadline Passed";

  return (
    <Card className="border w-full p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">

      <CardContent className="p-1">
        <div className="mb-4 w-full">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-[250px] object-fill rounded-md"
          />
        </div>
        <p className="text-gray-600 font-bold text-xl text-headline mb-3">{post.postTitle}</p>
        <p className="text-gray-600 mb-3">Category: {post.category}</p>
        <p className="text-gray-500 text-sm mb-2">
          Location: <span className="font-medium"> {post.location}</span>
        </p>
        <p className={`text-sm font-medium ${isActive ? "text-blue-600" : "text-red-600"}`}>
          {deadlineText} - Date: {post.deadline}
        </p>
      </CardContent>

      <CardFooter className="flex p-0 m-0 items-center justify-between">
        <Link
          to={`/posts/${post._id}`}
          className="transition-all"
        >
          <Button variant="link">View Details</Button>
        </Link>
        <CardHeader className="flex items-center justify-between">

        <Badge
          variant={isActive ? "success" : "destructive"}
          className={`text-sm px-2 py-1 ${isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {isActive ? "Active" : "Inactive"}
        </Badge>
      </CardHeader>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
