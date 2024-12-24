import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

const AllNeededPost = () => {
    return (
        <div>
            <div>
                <Button><Link to="/user/myposts">Need Volunteer</Link></Button>
            </div>
            <div>
                all post
            </div>
        </div>
    );
};

export default AllNeededPost;