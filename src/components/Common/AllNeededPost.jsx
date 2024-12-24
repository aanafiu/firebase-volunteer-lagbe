import PostCard from '@/components/Common/PostCard';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const AllNeededPost = () => {
  const posts = useLoaderData();
  console.log(posts);

  return (
    <div className='container mx-auto'>
      <div className="mb-4">
        <Button>
          <Link to="/user/myposts">Need Volunteer</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post}></PostCard>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default AllNeededPost;
