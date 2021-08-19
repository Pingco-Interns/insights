import React, {useState} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Button from '@material-ui/core/Button';

import TableRender from './TableRender';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import XLSX from 'xlsx';
import Switch from '@material-ui/core/Switch';
import Divider from '@material-ui/core/Divider';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

function AddChartModal(props) {
    const butStyle = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };

    const [showAddDialog, setAddDialog] = useState(false);
    const setAddDialogOpen = () => setAddDialog(true);
    const setAddDialogClose = () => setAddDialog(false);

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

    const [chartTheme, setChartTheme] = useState('nivo');
    const [fileName, setFileName] = useState('');
    const [chartName, setChartName] = useState('');
    const [colorSetting, setColorSetting] = useState('theme');
    const [customColors, setCustom] = useState([{}]);

    const modifyCustom = (item, newColor) => {
        var index = customColors.findIndex(x=> x.id===item.id)
        if(index !== -1){
            var temp = customColors.slice();
            temp[index].color = newColor;
            setCustom(temp)
        }
    };

    const [processedData, setProcessed] = useState();

    const [groupChecked, setGrouped] = useState(false);

    function genString(length) {
        var result = '';
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength),
            );
        }
        return result;
    }
    function randColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function clearState(){
        setChartTheme('nivo')
        setFileName('')
        setColorSetting('theme')
        setCustom([{}])
        setProcessed()
        setGrouped(false)
    }

    function onChange(e) {
        const reader = new FileReader();
        const filename = e.target.files[0].name;

        setFileName(filename);

        reader.onload = (e) => {
            const bstr = e.target.result;
            var workbook = XLSX.read(bstr, {type: 'binary'});
            var sheetNames = workbook.SheetNames;
            var sheetIndex = 1;

            var dataRaw = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetNames[sheetIndex - 1]],
            );
            var toAdd = Object.keys(dataRaw[0])
                .slice(1)
                .map((i) => ({id: i, color: randColor()}));
            setCustom(toAdd);

            var processed = {
                keys: Object.keys(dataRaw[0]).slice(1),
                rawKeys: Object.keys(dataRaw[0]),
                data: dataRaw,
            };
            setProcessed(processed);
        };

        reader.readAsBinaryString(e.target.files[0]);
    }

    function saveCurrent() {
        if (processedData) {
            var data = {
                data: processedData.data,
                keys: processedData.keys,
                indexBy: processedData.rawKeys[0],
                layout: {
                    i: genString(5),
                    x: 1,
                    y: 1,
                    w: 3,
                    h: 3,
                    minW: 3,
                    minH: 3,
                },
                rawKeys: processedData.rawKeys,
                active: false,
                options: {
                    colors: chartTheme,
                    legends: 'keys',
                    anchor: 'bottom-right',
                    groupMode: groupChecked ? 'grouped' : 'stacked',
                    custom: customColors,
                    setting: colorSetting
                },
                chartName: chartName,
            };
            props.parentCallback(data);
            setAddDialog(false);
            clearState();
        } else {
            setAddDialog(false);
        }
    }

    return (
        <div>
            <Dialog
                open={showAddDialog}
                onClose={setAddDialogClose}
                maxWidth="md"
                fullWidth="true"
                aria-labelledby="form-dialog">
                <DialogTitle id="form-dialog">Add an entry</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <FormControl>
                            <FormLabel>
                                Import excel document (Must be .xlsx){' '}
                            </FormLabel>
                            <Button variant="text" component="label">
                                {fileName
                                    ? 'Uploaded ' + fileName
                                    : 'Upload a file..'}
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    hidden
                                />
                            </Button>
                        </FormControl>

                        {typeof processedData !== 'undefined' &&
                        processedData != null ? (
                            <>
                                <Divider />
                                <TextField
                                    id="standard-basic"
                                    onChange={(e) =>
                                        setChartName(e.target.value)
                                    }
                                    label="Title of the chart"
                                />
                                <TableRender data={processedData} />
                                <br />
                                <Divider />
                                <Switch
                                    value={groupChecked ? 'grouped' : 'stacked'}
                                    checked={groupChecked}
                                    onChange={(e) => {
                                        setGrouped(e.target.checked);
                                    }}
                                    inputProps={{
                                        'aria-label': groupChecked
                                            ? 'grouped'
                                            : 'stacked',
                                    }}
                                />{' '}
                                {groupChecked ? 'Grouped' : 'Stacked'}
                                <Divider />
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        Coloring
                                    </FormLabel>
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
                                        <Typography
                                            variant="body1"
                                            color="initial">
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
                                        <br />
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
                                                    onChange={(e)=>{modifyCustom(i, e.target.value)}}
                                                />
                                            </span>
                                        ))}
                                    </>
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={saveCurrent}
                        disabled={processedData ? false : true}
                        color="default">
                        Save
                    </Button>
                    <Button onClick={setAddDialogClose} color="default">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>

            <Fab
                color="primary"
                onClick={setAddDialogOpen}
                style={butStyle}
                aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    );
}

export default AddChartModal;
