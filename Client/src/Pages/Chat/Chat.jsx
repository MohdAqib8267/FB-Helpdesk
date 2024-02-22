import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { FiAlignLeft } from "react-icons/fi";
import { IoReloadSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { HiChartBar } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import rich from "../../images/richpanel.png";
import { useNavigate, useParams } from "react-router-dom";

const Chat = () => {
  const [userList, setUserList] = useState([]);
  const [lastMsgId, setLastMsgId] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const [msgIdarr, setMsgIdarr] = useState([]);
  const [profile, setProfile] = useState("");
  const [mymsg, setMymsg] = useState("");
  const [profileInfo, setProfileInfo] = useState("");
 

  const pageId = useParams().pageId;
 
  const navigate = useNavigate();

  useEffect(() => {
    const getLastMsg = async (id) => {
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v19.0/${id}`,
          {
            params: {
              fields: "id,created_time,from,to,message",
              access_token: import.meta.env.VITE_PAGE_ACCESS_TOKEN,
            },
          }
        );

        // Handle the response data as needed
        // console.log(response.data);
        setLastMsg(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v19.0/${pageId}`,
          {
            params: {
              fields: "conversations{messages,participants,updated_time}",
              access_token: import.meta.env.VITE_PAGE_ACCESS_TOKEN,
            },
          }
        );

        // Handle the response data as needed
        // console.log(response.data?.conversations);
        setUserList(response?.data?.conversations);

        response?.data?.conversations?.data?.forEach((item) => {
          if (item?.participants?.data[0]?.id === profile?.data[0]?.id) {
            setMsgIdarr(item?.messages);
            // console.log(item.messages)
          }
        });

        setLastMsgId(
          response?.data?.conversations?.data[0]?.messages?.data[0]?.id
        );
        getLastMsg(
          response?.data?.conversations?.data[0]?.messages?.data[0]?.id
        );
       
      } catch (error) {
        // Handle errors
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [mymsg, lastMsgId]);

  

  function getTimeAgo(updatedTime) {
    const currentTimeDate = Date.now();
    const updateTimeDate = new Date(updatedTime);
    const diff = currentTimeDate - updateTimeDate;

    const secondDiff = Math.floor(diff / 1000);
    const minDiff = Math.floor(secondDiff / 60);
    const hourDiff = Math.floor(minDiff / 60);
    const dayDiff = Math.floor(hourDiff / 24);

    if (dayDiff > 0) {
      return `${dayDiff}d`;
    } else if (hourDiff > 0) {
      return `${hourDiff}h`;
    } else if (minDiff > 0) {
      return `${minDiff}m`;
    } else {
      return "Just now";
    }
  }
 
  useEffect(() => {
    const sendMsg = async () => {
      try {
        const arr = await Promise.all(
          msgIdarr?.data?.map(async (item) => {
            const response = await axios.get(
              `https://graph.facebook.com/v19.0/${item.id}`,
              {
                params: {
                  fields: "id,created_time,from,to,message",
                  access_token: import.meta.env.VITE_PAGE_ACCESS_TOKEN,
                },
              }
            );

            // Handle the response data as needed
            return response.data;
          })
        );

        setMsgs(arr.reverse());
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    sendMsg();
  }, [msgIdarr, mymsg]);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `https://graph.facebook.com/v19.0/${profile?.data[0]?.id}`,
          {
            params: {
              fields: "first_name,last_name,profile_pic",
              access_token: import.meta.env.VITE_PAGE_ACCESS_TOKEN,
            },
          }
        );
        
        setProfileInfo(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    getProfile();
  }, [profile]);
 
  const submitMsg = async () => {
    
    const pageAccessToken = import.meta.env.VITE_PAGE_ACCESS_TOKEN;
    const recipientId = "7002388243131749";
    const pageId = import.meta.env.VITE_PAGE_ID;

    const apiUrl = `https://graph.facebook.com/v19.0/${pageId}/messages?access_token=${pageAccessToken}`;

    const messageBody = {
      recipient: {
        id: recipientId,
      },
      messaging_type: "RESPONSE",
      message: {
        text: mymsg,
      },
    };
    try {
      const response = await axios.post(apiUrl, messageBody);
      // console.log(response.data);

      if (response.data) {
        setMymsg("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="Chat">
      <div className="first">
        <div style={{ cursor: "pointer" }} className="first-left">
          <img
            style={{
              width: "1.5rem",
              height: "1.5rem",
              marginTop: "1rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/delete")}
            src={rich}
            alt=""
          />
          <IoChatboxEllipsesOutline />
          <FaUsers />
          <HiChartBar />
        </div>
        <div className="first-right">
          {/* nav bar */}
          <div className="first-right-nav">
            <div className="nav-left">
              <span>
                <FiAlignLeft fill="white" />
              </span>
              <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
                Conversations
              </span>
            </div>
            <div className="nav-right">
              <IoReloadSharp />
            </div>
          </div>
          {/* chat list */}
          <div className="chat-list">
            {userList &&
              userList.data &&
              userList?.data?.map((item) => (
                <div
                  onClick={() => {
                    setMsgIdarr(item.messages);
                    setProfile(item.participants);
                  }}
                  className="chat-list-item"
                  key={item.id}
                >
                  <div className="name-time">
                    <span className="name-social">
                      <input type="checkbox" name="" id="" />
                      <span>
                        <div>{item?.participants?.data[0]?.name}</div>
                      </span>
                    </span>
                    <span style={{ fontSize: "0.75rem" }}>
                      {getTimeAgo(item.updated_time)}
                    </span>
                  </div>
                  <div className="last-msg">
                    <div style={{ marginLeft: "1.5rem", fontWeight: "500" }}>
                      {lastMsg}...
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* second */}
      <div className="second">
        <div className="second-right-nav">
          <div className="nav-left">
            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              {profileInfo && profile?.data[0]?.name}
            </span>
          </div>
        </div>
        {/* chat container */}
        <div className="msgs-container">
          {msgs.map((item, index) => (
            <div className="chat-container" key={index}>
              {item?.from?.id != "179904325216060" ? (
                <div
                  className="left"
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  {index === msgs.length - 2 && (
                    // <img src={item.from.image} alt={item.from.name} className="user-image" />
                    <img
                    style={{
                      width: "1rem",
                      height: "1rem",
                      borderRadius: "100%",
                      marginLeft:"-20px"
                    }}
                    src={profileInfo?.profile_pic}
                    alt={item.from.name}
                    className="user-image"
                  />
                  )}
                 <div>
                  <div className="mine">{item.message}</div>
                  {index === msgs.length - 2 && (
                    
                  <span style={{ fontSize: "0.7rem", width: "fitContent", position: "absolute", left: 0 }}>
                    {new Date(item?.created_time).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                    })}
                  </span>

                  )}
                  </div>
                </div>
              ) : (
                <div className="right" style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <div className="yours">{item.message} </div>
                  {index === msgs.length - 1 && (

                <span style={{fontSize:"0.7rem",width: "fitContent",position: "absolute",right: 0,bottom:"-30px"}}>
                {new Date(item?.created_time).toLocaleString('en-IN', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                })}
                </span>
                    
                
                  )}
                 
                </div>
              )}
            </div>
          ))}
        </div>

        {/* search */}
        <div
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              submitMsg();
            }
          }}
          className="message-input"
        >
          <input
            type="text"
            value={mymsg}
            onChange={(e) => setMymsg(e.target.value)}
            placeholder="Message..."
          />
        </div>
      </div>

      <div className="third">
        <div className="profile">
          <div className="profile-img">
            <img src={profileInfo?.profile_pic} alt="" />
          </div>
          <div className="profile-name-status">
            <div style={{ fontWeight: "bold", fontSize: "1.3rem" }}>
              {profile && profile?.data[0]?.name}
            </div>
            <div>online</div>
          </div>
          <div className="call-profile">
            <button className="profile-btn">call</button>
            <button className="profile-btn">profile</button>
          </div>
        </div>
        <div className="customer-details">
          <h2 style={{ display: "flex", fontWeight: "bold" }}>
            Customer Details
          </h2>
          <div className="email">
            <span>Email</span>
            <span style={{ fontWeight: "bold" }}>
              {profile && profile?.data[0]?.email}
            </span>
          </div>
          <div className="email">
            <span>First Name</span>
            <span style={{ fontWeight: "bold" }}>
              {profileInfo && profileInfo?.first_name}
            </span>
          </div>
          <div className="email">
            <span>Last Name</span>
            <span style={{ fontWeight: "bold" }}>
              {profileInfo && profileInfo?.last_name}
            </span>
          </div>
          <div
            className="email view-more"
            style={{ fontWeight: "bold", color: "lightblue" }}
          >
            View more details
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
