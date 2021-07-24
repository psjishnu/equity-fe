import React, { useState } from "react";
import Table from "./Table";
import { Button, Card, Typography } from "@material-ui/core";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Home() {
  const [count, setcount] = useState([1]);
  const changeCount = (n) => {
    if (n === -1 && count.length > 1)
      setcount(new Array(count.length + n).fill(1));
    else if (n === 1) setcount(new Array(count.length + n).fill(1));
  };
  const toastAlert = () => {
    toast.success("saved", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="w-full mt-5">
        <Card
          style={{ margin: "0px auto", width: "300px", textAlign: "center" }}
        >
          <Typography variant="h4">Trade Watch List</Typography>
        </Card>
      </div>
      <div className="mt-4 px-4">
        {count.map(() => (
          <Table toastAlert={toastAlert} />
        ))}
        <div className="flex">
          <div className="mx-2">
            <Button
              style={{ outline: "none" }}
              color="primary"
              variant="contained"
              onClick={() => changeCount(1)}
              classname="mx-2"
            >
              Add
            </Button>
          </div>
          <div className="mx-2">
            <Button
              style={{ outline: "none" }}
              color="secondary"
              variant="contained"
              onClick={() => changeCount(-1)}
            >
              Del
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
