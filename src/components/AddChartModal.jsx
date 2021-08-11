import React, {useState} from 'react';
import Chart from './Chart';

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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import XLSX from 'xlsx';

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

    // const anchorArray = [
    //     'top-left',
    //     'top',
    //     'top-right',
    //     'left',
    //     'center',
    //     'right',
    //     'bottom-left',
    //     'bottom',
    //     'bottom-right',
    // ];

    const [chartName, setChartName] = useState('');

    const [processedData, setProcessed] = useState();

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

    function onChange(e) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const bstr = e.target.result;
            var workbook = XLSX.read(bstr, {type: 'binary'});
            var sheetNames = workbook.SheetNames;
            var sheetIndex = 1;

            var dataRaw = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetNames[sheetIndex - 1]],
            );

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
                },
                chartName: chartName,
            };
            props.parentCallback(data);
            setAddDialog(false);
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
                            <FormLabel>Import excel document</FormLabel>
                            <Button variant="text" component="label">
                                Upload a file
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        onChange(e);
                                    }}
                                    hidden
                                />
                            </Button>
                            <FormHelperText>
                                Must be .xlsx format
                            </FormHelperText>
                        </FormControl>

                        {typeof processedData !== 'undefined' && processedData != null ? (
                            <>
  
                                <TableRender data={processedData} />

                                <Select
                                    value={chartTheme}
                                    onChange={(e) => {
                                        setChartTheme(e.target.value);
                                    }}>
                                    {themeArray.map((i) => {
                                        return (
                                            <option key={i} value={i}>
                                                {i}
                                            </option>
                                        );
                                    })}
                                </Select>
                                <FormHelperText>Chart theme</FormHelperText>
                                <TextField
                                    id="standard-basic"
                                    onChange={(e) =>
                                        setChartName(e.target.value)
                                    }
                                    label="Standard"
                                />
                                <FormHelperText>Chart Name</FormHelperText>

                                <Chart data={processedData.data}
                                    keys={processedData.keys}
                                    indexBy={'Country'}
                                    options={{
                                        colors: 'nivo',
                                        legends: 'keys',
                                        anchor: 'bottom-right',
                                    }}
                                />
                            </>
                        ) : (
                            <p></p>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={saveCurrent} color="default">
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
