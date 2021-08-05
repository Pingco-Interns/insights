import React, {useState} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

    const [processedData, setProcessed] = useState();

    function onChange(e) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const bstr = e.target.result;
            var workbook = XLSX.read(bstr, {type: 'binary'});
            var sheetNames = workbook.SheetNames;
            var sheetIndex = 1;

            var dataRaw = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetNames[sheetIndex - 1]],
            )

            var processed = {keys: Object.keys(dataRaw[0]).slice(1), data: dataRaw}
            setProcessed(processed)
        };

        reader.readAsBinaryString(e.target.files[0]);
        // getKeys();
    }

    // const getKeys = () => {
    //     if (typeof curData !== 'undefined') {
    //         setProcessed({
    //             data: {keys: Object.keys(curData[0]), data: curData},
    //         });
    //         console.log(processedData);
    //     }
    // };

    return (
        <div>
            <Dialog
                open={showAddDialog}
                onClose={setAddDialogClose}
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

                        {typeof processedData !== 'undefined' ? (
                            <TableRender data={processedData} />
                        ) : (
                            <p>No table selected, please try again</p>
                        )}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setAddDialogClose} color="default">
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
