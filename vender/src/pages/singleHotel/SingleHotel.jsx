import "./singleHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";

const SingleHotel = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [singleData, setSingleData] = useState([]);
  let id = useParams();
  const { data, loading, error } = useFetch(`/${path}/find/${id.dataId}`);

  useEffect(() => {
    setSingleData(data);
  }, [data]);
  console.log(singleData);

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* {singleData ? (
                <img src="" alt="" className="itemImg" />
              ) : (
                <img src={singleData.photos[0]} alt="" className="itemImg" />
              )} */}
              <div className="details">
                <h1 className="itemTitle">{singleData.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Title:</span>
                  <span className="itemValue">{singleData.title}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{singleData.type}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{singleData.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{singleData.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Distence:</span>
                  <span className="itemValue">{singleData.distance}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{singleData.cheapestPrice}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">New Users</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default SingleHotel;
