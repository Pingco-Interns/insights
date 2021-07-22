import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { AddCircle, CheckBox, RemoveCircle } from "@material-ui/icons";
import { ResponsiveBar } from "@nivo/bar";
import { IconButton, MenuItem, Menu, Typography } from "@material-ui/core";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const rawData = [
  {
    country: "AD",
    "hot dog": 152,
    "hot dogColor": "hsl(78, 70%, 50%)",
    burger: 161,
    burgerColor: "hsl(204, 70%, 50%)",
    sandwich: 179,
    sandwichColor: "hsl(10, 70%, 50%)",
    kebab: 167,
    kebabColor: "hsl(65, 70%, 50%)",
    fries: 195,
    friesColor: "hsl(246, 70%, 50%)",
    donut: 29,
    donutColor: "hsl(233, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 88,
    "hot dogColor": "hsl(315, 70%, 50%)",
    burger: 191,
    burgerColor: "hsl(279, 70%, 50%)",
    sandwich: 195,
    sandwichColor: "hsl(48, 70%, 50%)",
    kebab: 141,
    kebabColor: "hsl(45, 70%, 50%)",
    fries: 79,
    friesColor: "hsl(147, 70%, 50%)",
    donut: 130,
    donutColor: "hsl(303, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 65,
    "hot dogColor": "hsl(168, 70%, 50%)",
    burger: 126,
    burgerColor: "hsl(72, 70%, 50%)",
    sandwich: 24,
    sandwichColor: "hsl(33, 70%, 50%)",
    kebab: 188,
    kebabColor: "hsl(184, 70%, 50%)",
    fries: 177,
    friesColor: "hsl(111, 70%, 50%)",
    donut: 110,
    donutColor: "hsl(85, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 198,
    "hot dogColor": "hsl(138, 70%, 50%)",
    burger: 112,
    burgerColor: "hsl(96, 70%, 50%)",
    sandwich: 12,
    sandwichColor: "hsl(21, 70%, 50%)",
    kebab: 38,
    kebabColor: "hsl(113, 70%, 50%)",
    fries: 178,
    friesColor: "hsl(13, 70%, 50%)",
    donut: 62,
    donutColor: "hsl(313, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 93,
    "hot dogColor": "hsl(121, 70%, 50%)",
    burger: 44,
    burgerColor: "hsl(289, 70%, 50%)",
    sandwich: 196,
    sandwichColor: "hsl(270, 70%, 50%)",
    kebab: 156,
    kebabColor: "hsl(240, 70%, 50%)",
    fries: 31,
    friesColor: "hsl(191, 70%, 50%)",
    donut: 102,
    donutColor: "hsl(122, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 19,
    "hot dogColor": "hsl(158, 70%, 50%)",
    burger: 111,
    burgerColor: "hsl(127, 70%, 50%)",
    sandwich: 67,
    sandwichColor: "hsl(169, 70%, 50%)",
    kebab: 129,
    kebabColor: "hsl(60, 70%, 50%)",
    fries: 23,
    friesColor: "hsl(358, 70%, 50%)",
    donut: 104,
    donutColor: "hsl(248, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 169,
    "hot dogColor": "hsl(300, 70%, 50%)",
    burger: 93,
    burgerColor: "hsl(277, 70%, 50%)",
    sandwich: 104,
    sandwichColor: "hsl(214, 70%, 50%)",
    kebab: 64,
    kebabColor: "hsl(262, 70%, 50%)",
    fries: 35,
    friesColor: "hsl(288, 70%, 50%)",
    donut: 106,
    donutColor: "hsl(345, 70%, 50%)",
  },
];

function ChartTests() {
  const [barOptions, setOptions] = useState({
    options: { padding: 0.03, isGrouped: false },
  });

  const [data, setData] = useState(rawData)
  const [keyObj, setKeyObj] = useState([
    { name: "hot dog", enabled: true },
    { name: "burger", enabled: true },
    { name: "sandwich", enabled: true },
    { name: "kebab", enabled: true },
    { name: "fries", enabled: true },
    { name: "donut", enabled: true },
  ]);

  const filterData = () =>{
    var res
    keyObj.forEach(e => {
      //bracket notation for referencing json properties with whitespace
      //just messing around to figure out if i can get averages for all items.
    });
  }

  const calcAverage = (numArray) =>{
    let total = 0
    for (let i = 0; i < numArray.length; i++) {
      total += numArray[i]
    }
    return total/numArray.length
  }
  const keyNames = keyObj
    .map((i) => (i.enabled ? i.name : ""))
    .filter((i) => i !== "");

  const [dialogOpen, setOpen] = useState(false);
  const themeOptions = [
    "nivo",
    "dark2",
    "red_blue",
    "greys",
    "spectral",
    "blue_purple",
  ]; //TODO

  const [selectedIndex, setSelectedIndex] = useState(0);

  const MyResponsiveBar = (data) => (
    <ResponsiveBar
      data={data}
      keys={keyNames} //Shorthand to extract properties from JSON array as arr.
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={barOptions.options.padding}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      valueFormat={{ enabled: false }}
      colors={{ scheme: themeOptions[selectedIndex] }}
      groupMode={barOptions.options.isGrouped ? "grouped" : "stacked"}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const toggleDialog = () => {
    setOpen(!dialogOpen);
  };
  //misc
  const calcDates = () =>{
    let d1 = new Date("2021-03-15")
    let d2 = new Date("2021-07-18")
    d2.setDate(d2.getDate()+1)

    let arr = []
    let weekstrt = true //to dictate what day we are looking for. True if monday, false if sunday.
    let currentIndex=0
    for (let d = new Date(d1); d < d2; d.setDate(d.getDate() + 1)) {
      if (weekstrt && d.getDay()===1) {
        arr.push({weekStart: d, weekEnd:''})
        weekstrt = false
      }else if(!weekstrt && d.getDay() === 0){
        arr[currentIndex].weekEnd = d
        weekstrt = true
        currentIndex++ //adds to index so a new entry is created in the array.
      }
    }
    //Data returns
    console.log(arr)
  }

  const calcHours = () =>{
    let d1 = new Date(Date.now())
    let d2 = new Date(Date.now())
    d2.setDate(d2.getDate() + 3)

    //rounding to nearest hour. Add to the hours or keep the hours same, then remove overflowing minutes.
    d1.setHours(d1.getHours() + Math.round(d1.getMinutes()/60))
    d1.setMinutes(0, 0, 0)

    let arr = []
    for (let d = new Date(d1); d < d2; d.setHours(d.getHours() + 1)) {
      arr.push(new Date(d))
    }
    console.log(arr);
  }

  return (
    <div className="App">
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <div>
            Padding:
            <IconButton
              aria-label="Padding+"
              onClick={() => {
                setOptions((prev) => ({
                  options: {
                    ...prev.options,
                    padding: barOptions.options.padding + 0.1,
                  },
                }));
              }}
            >
              <AddCircle />
            </IconButton>
            <IconButton
              aria-label="Padding-"
              onClick={() => {
                setOptions((prev) => ({
                  options: {
                    ...prev.options,
                    padding: barOptions.options.padding - 0.1,
                  },
                }));
              }}
            >
              <RemoveCircle />
            </IconButton>
          </div>
          <div>
            {/* anchor element or anchorEl is used to set the position of the menu as it pops up. */}
            Theme:
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {themeOptions[selectedIndex]}
            </Button>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {themeOptions.map((o, i) => (
                <MenuItem
                  key={o}
                  selected={i === selectedIndex}
                  onClick={(e) => handleItemClick(e, i)}
                >
                  {o}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div>
            <Button
              onClick={() => {
                toggleDialog();
              }}
            >
              Chart key setup
            </Button>
          </div>
          <div>
            <Button
              onClick={() => {
                setOptions((prev) => ({
                  options: {
                    ...prev.options,
                    isGrouped: !barOptions.options.isGrouped,
                  },
                }));
              }}
            >
              {barOptions.options.isGrouped ? "Grouped" : "Stacked"}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="body1">
      <br />
        <br />
      <div style={{ height: 400 }}>{MyResponsiveBar(data)}</div>
      <div>
        <Dialog
          open={dialogOpen}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle id="form-dialog-title">Set up keys</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please specify the keys you want enabled.
            </DialogContentText>
            {keyObj.map((item, index) => (
              <FormControlLabel
                control={
                  <CheckBox
                    checked={item.enabled}
                    onClick={(e)=>{
                      const prev = [...keyObj];
                      prev[index] = {name: prev[index].name, enabled: !e.target.checked};
                      setKeyObj(prev);
                      console.log("onChange", e.target.checked);
                      console.log(keyObj);
                    }}
                    name={item.name}
                  />
                }
                label={item.name}
                key={item.name}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      </div>
      
      <div className="body2">
        {/* Trying out grid toolbars. */}
        {/* <span>Start Date <input type="date" name="date1" id="date1" onChange={(event)=>{setStartDate(event.target.valueAsDate)}}/></span>
        <br />
        <span>Start Date <input type="date" name="date2" id="date2" onChange={(event)=>{setEndDate(event.target.valueAsDate)}}/></span>
        <br /> */}
        <div className="appbartest" style={{"width":"50%", "backgroundColor":"lightgray"}}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6">
                Another one
              </Typography>
              <Button>Australia</Button>
            </Toolbar>
          </AppBar>
          <h2>Some text</h2>
          <Button onClick={calcDates()}>Calculate dates</Button>
        <Button onClick={calcHours()}>Calculate hours</Button> 
        <br />
        </div>


        {/* {dateState.map(item=>(<div>
          <p>{item.weekStart}</p>
          <p>{item.weekEnd}</p>
        </div>))} */}
      </div>
    </div>
  );
}

export default ChartTests;
