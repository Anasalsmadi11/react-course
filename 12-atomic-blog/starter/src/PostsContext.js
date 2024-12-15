import {useContext, createContext, useState } from "react";
import { faker } from "@faker-js/faker";

// the first letter is capital because PostContext is a component
const PostContext = createContext();

function createRandomPost() {
    return {
      title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
      body: faker.hacker.phrase(),
    };
  }

 function PostProvider({children}){


const [posts, setPosts] = useState(() =>
    Array.from({ length: 30 }, () => createRandomPost())
  );
      const [searchQuery, setSearchQuery] = useState("");

    
      // Derived state. These are the posts that will actually be displayed
      const searchedPosts =
        searchQuery.length > 0
          ? posts.filter((post) =>
              `${post.title} ${post.body}`
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
          : posts;
    
      function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
      }
    
      function handleClearPosts() {
        setPosts([]);
      }
      return <PostContext.Provider value={{
        posts:searchedPosts,
        onAddPost: handleAddPost,
        onClearPosts: handleClearPosts,
        searchQuery,
        setSearchQuery,

      }}>
          {children}
      </PostContext.Provider>
      
      
    
}
function usePosts(){
    const context= useContext(PostContext)
    if(context === undefined) throw new Error("post context was used outsid its provider") // added this so if the developer tried to use the context outside its provider it tells him what is wrong, this makes finding errors more easily
    return context
}
export {PostProvider, usePosts}