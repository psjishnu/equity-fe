import React, { useState } from "react";
import axios from "axios";
//import moment from "moment";
import { Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const baseURL = { url: process.env.REACT_APP_BASE_URL };
const useStyles = makeStyles({
  textField: {
    width: "100px",
  },
  text1: {
    width: "100px",
    backgroundColor: "red",
    color: "white",
    textAlign: "center",
    height: "60px",
    lineHeight: "60px",
    fontWeight: "bolder",
  },
  text2: {
    width: "100px",
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
    height: "60px",
    lineHeight: "60px",
    fontWeight: "bolder",
  },
  text3: {
    width: "100px",
    backgroundColor: "blue",
    color: "white",
    textAlign: "center",
    height: "60px",
    lineHeight: "60px",
    fontWeight: "bolder",
  },
  var: {
    width: "100px",
    backgroundColor: "yellow",
    color: "black",
    textAlign: "center",
    height: "60px",
    lineHeight: "60px",
    fontWeight: "bolder",
  },
  top: {
    fontWeight: "bolder",
    textAlign: "center",
  },
});
function Home() {
  const styles = useStyles();
  const [data, setdata] = useState({
    long1: "",
    long2: "",
    short1: "",
    short2: "",
    spread1: "",
    spread2: "",
    var1: "",
  });
  //const [loading, setloading] = useState(false);
  //const [rerender, setrerender] = useState(false);
  const [state, setstate] = useState({ firm1: "", firm2: "" });

  const onChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
    const query =
      name === "firm1"
        ? `firm1=${value}&firm2=${state.firm2}`
        : `firm1=${state.firm1}&firm2=${value}`;
    axios.get(`${baseURL.url}/getdata?${query}`).then((res) => {
      if (res && res.data) {
        setdata(res.data);

        const Data = res.data;
        let long1 = "",
          long2 = "",
          short1 = "",
          short2 = "",
          spread1 = "",
          spread2 = "",
          var1 = "";
        if (Data.result1.length > 0) {
          long1 = Data.result1[0];
          long2 = Data.result1[1];
        }
        if (Data.result2.length > 0) {
          short1 = Data.result2[0];
          short2 = Data.result2[1];
        }
        if (long1 && short1) {
          spread1 = roundNumber(long1 / short1);
        }
        if (long2 && short2) {
          spread2 = roundNumber(long2 / short2);
        }
        if (spread1 && spread2) {
          var1 = roundNumber(100 * (spread2 - spread1));
        }
        setdata({ long1, long2, spread1, spread2, short1, short2, var1 });
      }
    });
  };
  const roundNumber = (numb) => {
    return Math.round((numb + Number.EPSILON) * 100) / 100;
  };
  return (
    <>
      <div className="w-full text-sm  p-5">
        {0 ? (
          <>
            <Card style={{ maxWidth: "400px", margin: "0px auto" }}>
              <img
                alt="loader"
                src="https://www.washingtonpost.com/graphics/2020/health/coronavirus-sars-cov-2-structure/coronavirus-big.gif?v=13"
              ></img>
            </Card>
          </>
        ) : (
          <>
            <div className="w-full my-3">
              <div className="my-3 w-full flex">
                <Card
                  className={`mx-2 ${styles.top}`}
                  style={{
                    width: 200,
                  }}
                >
                  Companies
                </Card>
                <Card
                  className={`mx-1 ${styles.top}`}
                  style={{
                    width: 100,
                  }}
                >
                  Long
                </Card>
                <Card
                  className={`mx-1 ${styles.top}`}
                  style={{
                    width: 100,
                  }}
                >
                  Short
                </Card>
                <Card
                  className={`mx-1 ${styles.top}`}
                  style={{
                    width: 100,
                  }}
                >
                  Spread
                </Card>
                <Card
                  className={`mx-1 ${styles.top}`}
                  style={{
                    width: 100,
                  }}
                >
                  Long
                </Card>
                <Card
                  className={`mx-1 ${styles.top}`}
                  style={{
                    width: 100,
                  }}
                >
                  Short
                </Card>
                <Card
                  className={`mx-1 ${styles.top}`}
                  style={{
                    width: 100,
                  }}
                >
                  Spread
                </Card>{" "}
                <Card
                  className={`mx-1 ${styles.top}`}
                  style={{
                    width: 100,
                  }}
                >
                  %variance
                </Card>
              </div>
              <div className="flex">
                <Card className="mx-1">
                  <TextField
                    name="firm1"
                    value={state.firm1}
                    className={styles.textField}
                    variant="outlined"
                    onChange={onChange}
                  />
                </Card>
                <Card className="mx-1">
                  <TextField
                    name="firm2"
                    value={state.firm2}
                    className={styles.textField}
                    variant="outlined"
                    onChange={onChange}
                  />
                </Card>
                <Card className={`mx-1 ${styles.text1}`}>{data.long1}</Card>
                <Card className={`mx-1 ${styles.text2}`}>{data.short1}</Card>
                <Card className={`mx-1 ${styles.text3}`}>{data.spread1}</Card>

                <Card className={`mx-1 ${styles.text1}`}>{data.long2}</Card>
                <Card className={`mx-1 ${styles.text2}`}>{data.short2}</Card>
                <Card className={`mx-1 ${styles.text3}`}>{data.spread2}</Card>

                <Card className={`mx-1 ${styles.var}`}>
                  {data.var1 !== "" && data.var1 + "%"}
                </Card>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
