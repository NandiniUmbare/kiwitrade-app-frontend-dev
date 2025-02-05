import { getPostBrowseByCategory } from '@/api/data';
import { RootState } from '@/redux/store';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export interface PostType {
    postId: number;
}

const PostListing:React.FC = () => {
  const {selectedCategory, selectedGroup} = useSelector((state: RootState) => state.category);
  const [posts, setPosts] = useState<PostType[]>([]);
  const params = useParams();
  const getPosts = async () => {
    // Fetch posts based on selectedCategory and selectedGroup
    if (selectedCategory !== null && selectedGroup !== null) {
      const response = await getPostBrowseByCategory(selectedCategory, selectedGroup, Number(params.type));
      console.log(response);
      setPosts(response.datas);
    } 
  }
  
  useEffect(() => {
    console.log(selectedCategory, selectedGroup,params.type);
    getPosts();
  }, []);
  return (
    <div>
      PostListing
        {posts && posts.map((post) => (
            <div key={post.postId}>
                {post.postId}
            </div>
        ))}
    </div>
  )
}

export default PostListing