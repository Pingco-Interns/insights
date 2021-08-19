import React, {useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

import TableRender from './TableRender';
import Chart from './Chart';

export default function EditChart(props) {
    const themeArray = [
        'nivo',
        'category10',
        'accent',
        'dark2',
        'paired',
        'pastel1',
        'pastel2',
        'set1',
        'set2',
        'set3',
        'brown_blueGreen',
        'purpleRed_green',
        'pink_yellowGreen',
        'purple_orange',
        'red_blue',
        'red_grey',
        'red_yellow_blue',
        'red_yellow_green',
        'spectral',
        'blues',
        'greens',
        'greys',
        'oranges',
        'purples',
        'reds',
        'blue_green',
        'blue_purple',
        'green_blue',
        'orange_red',
        'purple_blue_green',
        'purple_blue',
        'purple_red',
        'red_purple',
        'yellow_green_blue',
        'yellow_green',
        'yellow_orange_brown',
        'yellow_orange_red',
    ];

    function randColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    const [chartName, setChartName] = useState(
        props.data.chartName ? props.data.chartName : '',
    );

    const [colorSetting, setColorSetting] = useState(
        props.data.options.setting ? props.data.options.setting : 'theme',
    );

    const [chartTheme, setChartTheme] = useState(
        props.data.options.setting === 'theme'
            ? props.data.options.colors
            : 'nivo', //default
    );

    const [customColors, setCustomColors] = useState(
        props.data.options.setting === 'custom'
            ? props.data.options.custom
            : props.data.keys.map((i) => {
                  return {id: i, color: randColor()};
              }),
    );

    const modifyCustom = (item, newColor) => {
        var index = customColors.findIndex((x) => x.id === item.id);
        if (index !== -1) {
            var temp = customColors.slice();
            temp[index].color = newColor;
            setCustomColors(temp);
        }
    };

    const saveData = () =>{
        var toSave = props.data
        toSave.options ={
            colors: chartTheme,
            custom: customColors,
            legends: "keys",
            setting: colorSetting,
            anchor: props.data.options.anchor,
            groupMode: props.data.options.groupMode
        }
        toSave.chartName = chartName
        props.onSave(toSave)
        props.onClose()
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            maxWidth="md"
            fullWidth="true">
            <DialogTitle id="form-dialog">Edit report</DialogTitle>
            <DialogContent>
                <FormControl>
                    <FormLabel>Chart Name</FormLabel>
                    <TextField
                        id="standard-basic"
                        label="Title"
                        onChange={(e) => setChartName(e.target.value)}
                        defaultValue={props.data.chartName}
                    />
                    <TableRender
                        data={{
                            data: props.data.data,
                            keys: props.data.keys,
                        }}></TableRender>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Coloring</FormLabel>
                        <RadioGroup
                            aria-label="coloring"
                            name="coloring"
                            value={colorSetting}
                            onChange={(e) => {
                                setColorSetting(e.target.value);
                            }}>
                            <FormControlLabel
                                value="theme"
                                label="Use preset themes"
                                control={<Radio />}
                            />
                            <FormControlLabel
                                value="custom"
                                label="Use custom colors"
                                control={<Radio />}
                            />
                        </RadioGroup>
                    </FormControl>
                    {colorSetting === 'theme' ? (
                        <>
                            <Typography variant="body1" color="initial">
                                Chart Theme
                            </Typography>
                            <Select
                                value={chartTheme}
                                onChange={(e) => {
                                    setChartTheme(e.target.value);
                                }}
                                label="Chart theme">
                                {themeArray.map((i) => {
                                    return (
                                        <option key={i} value={i}>
                                            {i}
                                        </option>
                                    );
                                })}
                            </Select>
                        </>
                    ) : (
                        <>
                            {customColors.map((i, index) => (
                                <span key={index}>
                                    {i.id} :{' '}
                                    <input
                                        type="color"
                                        name="color picker"
                                        id="colorpicker"
                                        style={{
                                            width: '25px',
                                            marginRight: '10px',
                                            border: 'none',
                                        }}
                                        value={i.color}
                                        onChange={(e) => {
                                            modifyCustom(i, e.target.value);
                                        }}
                                    />
                                </span>
                            ))}
                        </>
                    )}
                </FormControl>
                <Chart
                    data={props.data.data}
                    keys={props.data.keys}
                    indexBy={props.data.indexBy}
                    layout={props.data.layout}
                    legendLeft={props.data.legendLeft}
                    legendBottom={props.data.legendBottom}
                    options={{
                        colors: chartTheme,
                        custom: customColors,
                        legends: "keys",
                        setting: colorSetting,
                        anchor: props.data.options.anchor,
                        groupMode: props.data.options.groupMode
                    }}
                    ></Chart>
            </DialogContent>
            <DialogActions>
                <Button
                onClick={saveData}
                color="default"
                >
                    Save
                </Button>
                <Button color="default" onClick={props.onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}
