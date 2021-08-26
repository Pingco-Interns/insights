import React, {useEffect, useState} from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import {randColor, themeArray} from '../utils';

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
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';

import TableRender from './TableRender';
import Chart from './Chart';

export default function EditChart(props) {

    // #region seting up default data
    const [currentItem, setCurrentItem] = useState(props.data);
    const [chartName, setChartName] = useState(
        currentItem.chartName && currentItem.chartName,
    );
    const [colorSetting, setColorSetting] = useState(
        currentItem.options.setting ? currentItem.options.setting : 'theme',
    );
    const [groupChecked, setGrouped] = useState(currentItem.options.groupMode);
    const [chartTheme, setChartTheme] = useState(
        currentItem.options.setting.toString() === 'theme'
            ? currentItem.options.colors
            : 'nivo', //default
    );
    const [customColors, setCustomColors] = useState(
        currentItem.options.setting.toString() === 'custom'
            ? currentItem.options.custom
            : currentItem.keys.map((i) => {
                  return {id: i, color: randColor()};
              })
    );
    // #endregion

    //modify existing colour for a specific chart section
    const modifyCustom = (item, newColor) => {
        var index = customColors.findIndex((x) => x.id === item.id);
        if (index !== -1) {
            var temp = customColors.slice();
            temp[index].color = newColor;
            setCustomColors(temp);
        }
    };

    // save data
    const saveData = () => {
        var toSave = currentItem;
        toSave.options = {
            colors: chartTheme,
            custom: customColors,
            legends: 'keys',
            setting: colorSetting,
            anchor: currentItem.options.anchor,
            groupMode: groupChecked ? 'grouped' : 'stacked',
        };
        toSave.chartName = chartName;
        props.onSave(toSave);
        props.onClose();
    };
        
    useEffect(() => { //change state to defaults/current item when the selected item is changed.
        const setData = () => {
            setChartName(props.data.chartName && currentItem.chartName);
            setColorSetting(
                props.data.options.setting ? props.data.options.setting : 'theme',
            );
            setGrouped(props.data.options.groupMode);
            setChartTheme(
                props.data.options.setting.toString() === 'theme'
                    ? props.data.options.colors
                    : 'nivo',
            );
            setCustomColors(props.data.options.setting.toString() === 'custom'
            ? props.data.options.custom
            : props.data.keys.map((i) => {
                  return {id: i, color: randColor()};
              }),)
        };
        if (props.data.layout.i !== currentItem.layout.i) {
            setCurrentItem(props.data);
            setData()
        }
    }, [props.data]);

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
                        defaultValue={currentItem.chartName}
                    />
                </FormControl>
                <TableRender
                    data={{
                        data: currentItem.data,
                        keys: currentItem.keys,
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
                <Divider />
                <Switch
                    value={groupChecked ? 'grouped' : 'stacked'}
                    checked={groupChecked}
                    onChange={(e) => {
                        setGrouped(e.target.checked);
                    }}
                    inputProps={{
                        'aria-label': groupChecked ? 'grouped' : 'stacked',
                    }}
                />
                {groupChecked ? 'Grouped' : 'Stacked'}
                <Divider />
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
                <Chart
                    data={currentItem.data}
                    keys={currentItem.keys}
                    indexBy={currentItem.indexBy}
                    layout={currentItem.layout}
                    legendLeft={currentItem.legendLeft}
                    legendBottom={currentItem.legendBottom}
                    options={{
                        colors: chartTheme,
                        custom: customColors,
                        legends: 'keys',
                        setting: colorSetting,
                        anchor: currentItem.options.anchor,
                        groupMode: groupChecked ? 'grouped' : 'stacked',
                    }}></Chart>
            </DialogContent>
            <DialogActions>
                <Button onClick={saveData} color="default">
                    Save
                </Button>
                <Button color="default" onClick={props.onClose}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
}
