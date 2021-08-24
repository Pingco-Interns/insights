import React, {useState} from 'react';
import {WidthProvider, Responsive} from 'react-grid-layout';

import Chart from './Chart';

import TableRender from './TableRender';

import Button from '@material-ui/core/Button';
import TableChartIcon from '@material-ui/icons/TableChart';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Tooltip} from '@material-ui/core';

const DashboardGrid = React.memo((props) => {
    const [showTableDialog, setShowTableDialog] = useState(false);
    const setTableDialogOpen = () => setShowTableDialog(true);
    const setTableDialogClose = () => setShowTableDialog(false);
    const ReactGridLayout = WidthProvider(Responsive);

    const [currentData, setCurrentData] = useState(props.data[0]);

    const onDrop = (layout, layoutItem, _event) => {
        _event.preventDefault();
        props.handleDrop(_event.dataTransfer.getData('text'), layoutItem);
        //index
    };

    return (
        <>
            <ReactGridLayout
                style={{border: '1px solid grey', minHeight: '500px'}}
                className="layout"
                cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}
                rows={15}
                rowHeight={100}
                breakpoints={{
                    lg: 1200,
                    md: 996,
                    sm: 768,
                    xs: 480,
                    xxs: 0,
                }}
                width={1200}
                isDroppable={true}
                onDrop={onDrop}
                draggableHandle=".draggableHandle">
                {props.data.map((i) => {
                    return (
                        <div
                            style={{
                                border: '1px solid black',
                                borderRadius: '4px',
                            }}
                            data-grid={i.layout}
                            key={i.layout.i}>
                            <Tooltip title="Drag chart">
                                <div
                                    id="handle"
                                    className="draggableHandle"
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: 'lightblue',
                                        minWidth: '100%',
                                        minHeight: '25px',
                                        position: 'fixed',
                                        cursor: 'pointer',
                                        borderTopLeftRadius: '4px',
                                        borderTopRightRadius: '4px',
                                    }}>
                                    <DragHandleIcon fontSize="inherit" />
                                    {i.chartName
                                        ? i.chartName
                                        : 'Untitled chart'}
                                </div>
                            </Tooltip>
                            <Tooltip title="Show table">
                                <Button
                                    size="medium"
                                    onClick={(e) => {
                                        setTableDialogOpen();
                                        setCurrentData(i);
                                    }}>
                                    <TableChartIcon fontSize="inherit" />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Remove chart">
                                <Button
                                    size="medium"
                                    onClick={() => props.toggleActive(i, false)}
                                    style={{float: 'right'}}>
                                    <RemoveCircleIcon fontSize="inherit" />
                                </Button>
                            </Tooltip>
                            <Chart
                                className="nonDraggable"
                                data={i.data}
                                keys={i.keys}
                                indexBy={i.indexBy}
                                layout={i.layout}
                                legendLeft={i.legendLeft}
                                legendBottom={i.legendBottom}
                                options={i.options}
                            />
                        </div>
                    );
                })}
            </ReactGridLayout>
            <Dialog open={showTableDialog} onClose={setTableDialogClose}>
                <DialogTitle id="form-dialog-title">Chart data</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Chart data of "
                        <b>
                            {currentData.chartName
                                ? currentData.chartName
                                : 'Untitled chart'}
                        </b>
                        "
                    </DialogContentText>
                    <TableRender
                        data={{data: currentData.data, keys: currentData.keys}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={setTableDialogClose} color="default">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default DashboardGrid