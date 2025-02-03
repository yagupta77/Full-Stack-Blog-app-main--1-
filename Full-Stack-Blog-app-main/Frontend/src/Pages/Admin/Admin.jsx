import React, { useEffect, useState } from 'react';
import { get } from '../../services/Endpoint';

export default function Admin() {
  const [post, setPost] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  console.log(post);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await get('/dashboard');
        const response = request.data;

        console.log(response);

        if (request.status === 200) {
          setPost(response.Posts);
          setUsers(response.Users);
          setComments(response.comments);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts

    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup function
  }, []);

  return (
    <>
      <div>
        <h2 className="mb-4 text-white">Dashboard</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="card bg-primary text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Users</h5>
                <p className="card-text">{users ? users.length : '0'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Posts</h5>
                <p className="card-text">{post ? post.length : "0"}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-warning text-white mb-4">
              <div className="card-body">
                <h5 className="card-title">Total Comments</h5>
                <p className="card-text">{comments ? comments.length : "0"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
