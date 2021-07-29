import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

function TableRender(props) {
    console.log(props.data)
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={{minWidth: 650}} size="small">
                    <TableHead>
                        <TableRow>
                            {/* gonna hardcode the first row for readability. */}
                            <TableCell>Country/Food</TableCell>
                            {props.data.keys.map((i) => {
                                return <TableCell align="right">{i}</TableCell>;
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.data.data.map((i) => {
                            //this convoluted mess is to render the table using keys and data grabbed from the
                            return (
                                <TableRow>
                                    <TableCell align="right">
                                        {i.country}
                                    </TableCell>
                                    {props.data.keys.map((j) => {
                                        return (
                                            <TableCell align="right">
                                                {i[j]}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TableRender