import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  TextField,
  FormControl,
  InputAdornment,
  IconButton,
  OutlinedInput,
} from "@material-ui/core";
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
function Table({ toastAlert }) {
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
    sectorName: "",
  });

  const [state, setstate] = useState({ firm1: "", firm2: "" });
  const [sectorName, setSectorName] = useState("");
  const postData = async (postObject, changeSector) => {
    const res = await axios.post(`${baseURL.url}/getdata`, {
      ...postObject,
      changeSector,
    });
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
        sectorName,
      } = res.data;
      setSectorName(sectorName);
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
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
    const postObject =
      name === "firm1"
        ? {
            firm1: value || "__NULL__",
            firm2: state.firm2 || "__NULL__",
            sector: sectorName,
          }
        : name === "firm2"
        ? {
            firm1: state.firm1 || "__NULL__",
            firm2: value || "__NULL__",
            sector: sectorName,
          }
        : {
            firm1: state.firm1 || "__NULL__",
            firm2: state.firm2 || "__NULL__",
            sector: sectorName,
          };
    let changeSector = false;
    if (!(name === "firm1" || name === "firm2")) {
      toastAlert();
      changeSector = true;
    }
    postData(postObject, changeSector);
  };

  return (
    <>
      <div className="w-full text-sm ">
        <div className="w-full my-1 overflow-x-auto ">
          <div className="my-3 w-full flex">
            <div>
              <Card
                className={`mx-2 ${styles.top}`}
                style={{
                  width: 140,
                }}
              >
                Sector/Industry
              </Card>
            </div>
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
                <FormControl style={{ width: "150px" }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-password"
                    value={sectorName}
                    onChange={(e) => setSectorName(e.target.value)}
                    name="sectorName"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => onChange(e)}
                          name="sector"
                          edge="end"
                          style={{
                            backgroundColor: "lightgreen",
                            outline: "none",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="darkgreen"
                            class="bi bi-check-circle-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                          </svg>
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Card>
            </div>
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
      </div>
    </>
  );
}

export default Table;
