import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading} = useFetch(`/${path}`);  

  useEffect(() => {
    setList(data);
  }, [data]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {}
  };

  const isBlock =async (id) => {
    try {
      await axios.put(`/block/${path}/${id}`)
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }

  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
          { !(path === "users" || path === "venders")  ? (
            <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
              <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
              >
              Delete
            </div>
          </div>
            ) : (<button onClick={() => isBlock(params.row._id)}>Block</button>
            )}
              </>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default Datatable;
