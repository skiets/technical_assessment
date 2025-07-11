import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/home")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts", err);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg p-4">
          <img
            src={`http://localhost:8080${post.image_url}`}
            alt={post.title}
            className="w-full h-48 object-cover rounded-md mb-2"
          />
          <h2 className="font-bold text-lg">{post.title}</h2>
          <p className="text-sm text-gray-700">{post.description}</p>
        </div>
      ))}
    </div>
  );
}