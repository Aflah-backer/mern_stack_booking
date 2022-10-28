import useFetch from "../../hooks/userFetch";
import "./featured.scss";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Kozhikode,Ernakulam,Thiruvananthapuram"
  );

  return (
    <div className="fearureContainer">
      <div className="featured">
        {loading ? (
          "Loading please wait"
        ) : (
          <>
            <div className="featuredItem">
              <img
                src="https://pickyourtrail.com/blog/wp-content/uploads/2020/07/photo-1580046345567-8b5d44d8cbab.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Kozhikode</h1>
                <h2>{data[0]} properties</h2>
              </div>
            </div>

            <div className="featuredItem">
              <img
                src="https://www.oyorooms.com/travel-guide/wp-content/uploads/2019/04/Fort-Kochi.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Ernakulam</h1>
                <h2>{data[1]} properties</h2>
              </div>
            </div>
            <div className="featuredItem">
              <img
                src="https://cdn.britannica.com/72/124672-050-3E457773/Thiruvananthapuram-Kerala-Legislative-Assembly-Building-India.jpg"
                alt=""
                className="featuredImg"
              />
              <div className="featuredTitles">
                <h1>Thiruvananthapuram</h1>
                <h2>{data[2]} properties</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Featured;
