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
  text4: {
    width: "100px",
    backgroundColor: "wheat",
    textAlign: "center",
    height: "60px",
    lineHeight: "60px",
    fontWeight: "bolder",
  },
  avg: {
    width: "100px",
    backgroundColor: "black",
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
    avg: "",
    varianceArr: [],
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
        const {
          long1,
          long2,
          spread1,
          spread2,
          short1,
          short2,
          var1,
          varianceArr,
          avg,
        } = res.data;
        setdata({
          long1,
          long2,
          spread1,
          spread2,
          short1,
          short2,
          var1,
          varianceArr,
          avg,
        });
      }
    });
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
            <div className="w-full my-3 overflow-x-auto ">
              <div className="my-3 w-full flex">
                <div>
                  <Card
                    className={`mx-2 ${styles.top}`}
                    style={{
                      width: 200,
                    }}
                  >
                    Companies
                  </Card>
                </div>
                <div>
                  <Card
                    className={`mx-1 ${styles.top}`}
                    style={{
                      width: 100,
                    }}
                  >
                    Long
                  </Card>
                </div>
                <div>
                  <Card
                    className={`mx-1 ${styles.top}`}
                    style={{
                      width: 100,
                    }}
                  >
                    Short
                  </Card>
                </div>
                <div>
                  <Card
                    className={`mx-1 ${styles.top}`}
                    style={{
                      width: 100,
                    }}
                  >
                    Spread
                  </Card>
                </div>
                <div>
                  <Card
                    className={`mx-1 ${styles.top}`}
                    style={{
                      width: 100,
                    }}
                  >
                    Long
                  </Card>
                </div>
                <div>
                  <Card
                    className={`mx-1 ${styles.top}`}
                    style={{
                      width: 100,
                    }}
                  >
                    Short
                  </Card>
                </div>
                <div>
                  <Card
                    className={`mx-1 ${styles.top}`}
                    style={{
                      width: 100,
                    }}
                  >
                    Spread
                  </Card>
                </div>

                {data.avg !== "" && (
                  <>
                    {data.varianceArr.map((value, index) => {
                      return (
                        <div key={index}>
                          <Card
                            className={`mx-1 ${styles.top}`}
                            style={{
                              width: 100,
                            }}
                          >
                            Week {index + 1}
                          </Card>
                        </div>
                      );
                    })}
                    <div>
                      <Card
                        className={`mx-1 ${styles.top}`}
                        style={{
                          width: 100,
                        }}
                      >
                        Average
                      </Card>
                    </div>
                  </>
                )}
              </div>
              <div className="flex">
                <div>
                  <Card className="mx-1">
                    <TextField
                      name="firm1"
                      value={state.firm1}
                      className={styles.textField}
                      variant="outlined"
                      onChange={onChange}
                    />
                  </Card>
                </div>
                <div>
                  <Card className="mx-1">
                    <TextField
                      name="firm2"
                      value={state.firm2}
                      className={styles.textField}
                      variant="outlined"
                      onChange={onChange}
                    />
                  </Card>
                </div>
                <div>
                  <Card className={`mx-1 ${styles.text1}`}>{data.long1}</Card>
                </div>
                <div>
                  <Card className={`mx-1 ${styles.text2}`}>{data.short1}</Card>
                </div>
                <div>
                  <Card className={`mx-1 ${styles.text3}`}>{data.spread1}</Card>
                </div>
                <div>
                  <Card className={`mx-1 ${styles.text1}`}>{data.long2}</Card>
                </div>
                <div>
                  <Card className={`mx-1 ${styles.text2}`}>{data.short2}</Card>
                </div>
                <div>
                  <Card className={`mx-1 ${styles.text3}`}>{data.spread2}</Card>
                </div>

                {data.avg !== "" && (
                  <>
                    {data.varianceArr.map((value, index) => {
                      return (
                        <div key={index}>
                          <Card
                            style={{ color: value < 0 ? "red" : "green" }}
                            className={`mx-1 ${styles.text4}`}
                          >
                            {value}
                          </Card>
                        </div>
                      );
                    })}
                    <div>
                      <Card className={`mx-1 ${styles.avg}`}>{data.avg}</Card>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
