import React, { useState } from "react";
import Table from "./Table";
import { Button } from "@material-ui/core";
function Home() {
  const [count, setcount] = useState([1]);
  const changeCount = (n) => {
    if (n === -1 && count.length > 1)
      setcount(new Array(count.length + n).fill(1));
    else if (n === 1) setcount(new Array(count.length + n).fill(1));
  };
  return (
    <>
      {count.map(() => (
        <Table />
      ))}
      <div className="flex">
        <div className="mx-2">
          <Button
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
            color="secondary"
            variant="contained"
            onClick={() => changeCount(-1)}
          >
            Del
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
