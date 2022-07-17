import React, { useState, useEffect } from "react";
import "./Home.css";
import Loader from "./Loader";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [email, setEmail] = useState("");

  const url = "https://602e7c2c4410730017c50b9d.mockapi.io/users";

  useEffect(() => {
    apidata();
    setLoading(true);
  }, []);

  const apidata = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setData(jsonData);
    setName(`${jsonData[0].profile.firstName} ${jsonData[0].profile.lastName}`);
    setUserName(jsonData[0].profile.username);
    setBio(jsonData[0].Bio);
    setJobTitle(jsonData[0].jobTitle);
    setEmail(jsonData[0].profile.email);
    setLoading(false);
  };

  const selectUser = (id) => {
    console.log(data[id - 1]);
    setName(
      `${data[id - 1].profile.firstName} ${data[id - 1].profile.lastName}`
    );
    setUserName(data[id - 1].profile.username);
    setBio(data[id - 1].Bio);
    setJobTitle(data[id - 1].jobTitle);
    setEmail(data[id - 1].profile.email);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home__Container">
          <div className="first-child">
            <h1 className="text-center heading">USERS LIST</h1>
            {data.map((item, id) => {
              return (
                <div
                  className="user-section mt-10"
                  key={id}
                  onClick={() => {
                    selectUser(item.id);
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt=""
                  />
                  <p>
                    <span>{item.profile.firstName} </span>
                    <span>{item.profile.lastName}</span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className="second-child w-100 ml-50">
            <h1 className="text-center heading">USER DETAILS</h1>
            <div className="d-flex flex-column align-items-center">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt=""
              />
              <p className="mt-20">@ {username}</p>
              <textarea
                className="user__Bio mt-20"
                id=""
                rows="5"
                value={bio}
                onChange={selectUser}
              ></textarea>
              <form className="user_Details mt-20">
                <label htmlFor="Full Name">Full Name</label>
                <input
                  type="text"
                  className="mt-10"
                  value={name}
                  onChange={selectUser}
                />
                <label htmlFor="Job Title" className="mt-20">
                  Job Title
                </label>
                <input
                  type="text"
                  className="mt-10"
                  value={jobtitle}
                  onChange={selectUser}
                />
                <label htmlFor="Email" className="mt-20">
                  Email
                </label>
                <input
                  type="text"
                  className="mt-10"
                  value={email}
                  onChange={selectUser}
                />
              </form>
            </div>
            {/* <p>
          Home Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          est libero recusandae laborum nihil, error dolorum similique nemo ab
          dicta voluptatem deleniti voluptas fugiat hic et doloremque earum.
          Fugiat, voluptatum.
        </p> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
