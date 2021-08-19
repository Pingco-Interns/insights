import React, {useState} from 'react';
import {WidthProvider, Responsive} from 'react-grid-layout';

import Chart from './Chart';
import AddChartModal from './AddChartModal';
import TableRender from './TableRender';
import EditChart from './EditChart';

import Button from '@material-ui/core/Button';
import TableChartIcon from '@material-ui/icons/TableChart';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Tooltip, Grid, Snackbar, IconButton} from '@material-ui/core';
import {Close as CloseIcon} from '@material-ui/icons';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';

const dataRaw = [
    //Maybe this can be processed in the backend? front end can do processing too, with some templated/default values.
    //all properties except layout is used by nivo to render the chart and can be customised.
    //layout docs can be found here https://github.com/react-grid-layout/react-grid-layout#usage

    {
        data: [
            {
                country: 'AD',
                'hot dog': 58,
                'hot dogColor': 'hsl(53, 70%, 50%)',
                burger: 93,
                burgerColor: 'hsl(155, 70%, 50%)',
                sandwich: 5,
                sandwichColor: 'hsl(248, 70%, 50%)',
                kebab: 107,
                kebabColor: 'hsl(4, 70%, 50%)',
                fries: 35,
                friesColor: 'hsl(265, 70%, 50%)',
                donut: 105,
                donutColor: 'hsl(155, 70%, 50%)',
            },
            {
                country: 'AE',
                'hot dog': 185,
                'hot dogColor': 'hsl(127, 70%, 50%)',
                burger: 3,
                burgerColor: 'hsl(86, 70%, 50%)',
                sandwich: 101,
                sandwichColor: 'hsl(281, 70%, 50%)',
                kebab: 103,
                kebabColor: 'hsl(19, 70%, 50%)',
                fries: 154,
                friesColor: 'hsl(356, 70%, 50%)',
                donut: 20,
                donutColor: 'hsl(41, 70%, 50%)',
            },
            {
                country: 'AF',
                'hot dog': 25,
                'hot dogColor': 'hsl(140, 70%, 50%)',
                burger: 175,
                burgerColor: 'hsl(220, 70%, 50%)',
                sandwich: 120,
                sandwichColor: 'hsl(104, 70%, 50%)',
                kebab: 37,
                kebabColor: 'hsl(170, 70%, 50%)',
                fries: 148,
                friesColor: 'hsl(118, 70%, 50%)',
                donut: 157,
                donutColor: 'hsl(338, 70%, 50%)',
            },
            {
                country: 'AG',
                'hot dog': 54,
                'hot dogColor': 'hsl(99, 70%, 50%)',
                burger: 181,
                burgerColor: 'hsl(101, 70%, 50%)',
                sandwich: 189,
                sandwichColor: 'hsl(145, 70%, 50%)',
                kebab: 89,
                kebabColor: 'hsl(64, 70%, 50%)',
                fries: 28,
                friesColor: 'hsl(108, 70%, 50%)',
                donut: 111,
                donutColor: 'hsl(355, 70%, 50%)',
            },
            {
                country: 'AI',
                'hot dog': 84,
                'hot dogColor': 'hsl(275, 70%, 50%)',
                burger: 6,
                burgerColor: 'hsl(35, 70%, 50%)',
                sandwich: 41,
                sandwichColor: 'hsl(325, 70%, 50%)',
                kebab: 87,
                kebabColor: 'hsl(91, 70%, 50%)',
                fries: 130,
                friesColor: 'hsl(27, 70%, 50%)',
                donut: 49,
                donutColor: 'hsl(92, 70%, 50%)',
            },
            {
                country: 'AL',
                'hot dog': 126,
                'hot dogColor': 'hsl(81, 70%, 50%)',
                burger: 69,
                burgerColor: 'hsl(2, 70%, 50%)',
                sandwich: 110,
                sandwichColor: 'hsl(266, 70%, 50%)',
                kebab: 100,
                kebabColor: 'hsl(212, 70%, 50%)',
                fries: 98,
                friesColor: 'hsl(341, 70%, 50%)',
                donut: 115,
                donutColor: 'hsl(55, 70%, 50%)',
            },
            {
                country: 'AM',
                'hot dog': 174,
                'hot dogColor': 'hsl(273, 70%, 50%)',
                burger: 174,
                burgerColor: 'hsl(257, 70%, 50%)',
                sandwich: 83,
                sandwichColor: 'hsl(157, 70%, 50%)',
                kebab: 152,
                kebabColor: 'hsl(157, 70%, 50%)',
                fries: 29,
                friesColor: 'hsl(287, 70%, 50%)',
                donut: 45,
                donutColor: 'hsl(214, 70%, 50%)',
            },
        ],
        keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
        indexBy: 'country',
        layout: {i: 'a', x: 1, y: 0, w: 3, h: 3, minW: 3, minH: 3},
        active: true,
        options: {
            colors: 'nivo',
            defs: [
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ],
            fill: [
                //Colours specific ones differently.
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ],
            legends: 'keys',
            anchor: 'bottom-right',
            setting: 'theme',
        },
        chartName: "Chart 1 custom name, index is 'a'",
    },
    {
        data: [
            {
                country: 'AD',
                'hot dog': 58,
                'hot dogColor': 'hsl(53, 70%, 50%)',
                burger: 93,
                burgerColor: 'hsl(155, 70%, 50%)',
                sandwich: 5,
                sandwichColor: 'hsl(248, 70%, 50%)',
                kebab: 107,
                kebabColor: 'hsl(4, 70%, 50%)',
                fries: 35,
                friesColor: 'hsl(265, 70%, 50%)',
                donut: 105,
                donutColor: 'hsl(155, 70%, 50%)',
            },
            {
                country: 'AE',
                'hot dog': 185,
                'hot dogColor': 'hsl(127, 70%, 50%)',
                burger: 3,
                burgerColor: 'hsl(86, 70%, 50%)',
                sandwich: 101,
                sandwichColor: 'hsl(281, 70%, 50%)',
                kebab: 103,
                kebabColor: 'hsl(19, 70%, 50%)',
                fries: 154,
                friesColor: 'hsl(356, 70%, 50%)',
                donut: 20,
                donutColor: 'hsl(41, 70%, 50%)',
            },
            {
                country: 'AF',
                'hot dog': 25,
                'hot dogColor': 'hsl(140, 70%, 50%)',
                burger: 175,
                burgerColor: 'hsl(220, 70%, 50%)',
                sandwich: 120,
                sandwichColor: 'hsl(104, 70%, 50%)',
                kebab: 37,
                kebabColor: 'hsl(170, 70%, 50%)',
                fries: 148,
                friesColor: 'hsl(118, 70%, 50%)',
                donut: 157,
                donutColor: 'hsl(338, 70%, 50%)',
            },
            {
                country: 'AG',
                'hot dog': 54,
                'hot dogColor': 'hsl(99, 70%, 50%)',
                burger: 181,
                burgerColor: 'hsl(101, 70%, 50%)',
                sandwich: 189,
                sandwichColor: 'hsl(145, 70%, 50%)',
                kebab: 89,
                kebabColor: 'hsl(64, 70%, 50%)',
                fries: 28,
                friesColor: 'hsl(108, 70%, 50%)',
                donut: 111,
                donutColor: 'hsl(355, 70%, 50%)',
            },
            {
                country: 'AI',
                'hot dog': 84,
                'hot dogColor': 'hsl(275, 70%, 50%)',
                burger: 6,
                burgerColor: 'hsl(35, 70%, 50%)',
                sandwich: 41,
                sandwichColor: 'hsl(325, 70%, 50%)',
                kebab: 87,
                kebabColor: 'hsl(91, 70%, 50%)',
                fries: 130,
                friesColor: 'hsl(27, 70%, 50%)',
                donut: 49,
                donutColor: 'hsl(92, 70%, 50%)',
            },
            {
                country: 'AL',
                'hot dog': 126,
                'hot dogColor': 'hsl(81, 70%, 50%)',
                burger: 69,
                burgerColor: 'hsl(2, 70%, 50%)',
                sandwich: 110,
                sandwichColor: 'hsl(266, 70%, 50%)',
                kebab: 100,
                kebabColor: 'hsl(212, 70%, 50%)',
                fries: 98,
                friesColor: 'hsl(341, 70%, 50%)',
                donut: 115,
                donutColor: 'hsl(55, 70%, 50%)',
            },
            {
                country: 'AM',
                'hot dog': 174,
                'hot dogColor': 'hsl(273, 70%, 50%)',
                burger: 174,
                burgerColor: 'hsl(257, 70%, 50%)',
                sandwich: 83,
                sandwichColor: 'hsl(157, 70%, 50%)',
                kebab: 152,
                kebabColor: 'hsl(157, 70%, 50%)',
                fries: 29,
                friesColor: 'hsl(287, 70%, 50%)',
                donut: 45,
                donutColor: 'hsl(214, 70%, 50%)',
            },
        ],
        keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
        indexBy: 'country',
        layout: {i: 'b', x: 2, y: 0, w: 3, h: 3, minW: 3, minH: 3},
        active: true,
        options: {
            colors: 'pastel1',
            defs: [
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ],
            fill: [
                //Colours specific ones differently.
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ],
            legends: 'keys',
            anchor: 'bottom-right',
            setting: 'theme',
        },
    },
    {
        data: [
            {
                country: 'AD',
                'hot dog': 104,
                'hot dogColor': 'hsl(189, 70%, 50%)',
                burger: 69,
                burgerColor: 'hsl(259, 70%, 50%)',
                sandwich: 137,
                sandwichColor: 'hsl(125, 70%, 50%)',
                kebab: 20,
                kebabColor: 'hsl(82, 70%, 50%)',
                fries: 63,
                friesColor: 'hsl(224, 70%, 50%)',
                donut: 169,
                donutColor: 'hsl(171, 70%, 50%)',
            },
            {
                country: 'AE',
                'hot dog': 121,
                'hot dogColor': 'hsl(297, 70%, 50%)',
                burger: 172,
                burgerColor: 'hsl(115, 70%, 50%)',
                sandwich: 190,
                sandwichColor: 'hsl(65, 70%, 50%)',
                kebab: 146,
                kebabColor: 'hsl(346, 70%, 50%)',
                fries: 194,
                friesColor: 'hsl(181, 70%, 50%)',
                donut: 20,
                donutColor: 'hsl(266, 70%, 50%)',
            },
            {
                country: 'AF',
                'hot dog': 156,
                'hot dogColor': 'hsl(202, 70%, 50%)',
                burger: 113,
                burgerColor: 'hsl(173, 70%, 50%)',
                sandwich: 92,
                sandwichColor: 'hsl(247, 70%, 50%)',
                kebab: 168,
                kebabColor: 'hsl(99, 70%, 50%)',
                fries: 85,
                friesColor: 'hsl(340, 70%, 50%)',
                donut: 28,
                donutColor: 'hsl(184, 70%, 50%)',
            },
            {
                country: 'AG',
                'hot dog': 1,
                'hot dogColor': 'hsl(22, 70%, 50%)',
                burger: 43,
                burgerColor: 'hsl(98, 70%, 50%)',
                sandwich: 172,
                sandwichColor: 'hsl(173, 70%, 50%)',
                kebab: 74,
                kebabColor: 'hsl(237, 70%, 50%)',
                fries: 156,
                friesColor: 'hsl(261, 70%, 50%)',
                donut: 73,
                donutColor: 'hsl(166, 70%, 50%)',
            },
            {
                country: 'AI',
                'hot dog': 6,
                'hot dogColor': 'hsl(291, 70%, 50%)',
                burger: 70,
                burgerColor: 'hsl(261, 70%, 50%)',
                sandwich: 12,
                sandwichColor: 'hsl(209, 70%, 50%)',
                kebab: 147,
                kebabColor: 'hsl(70, 70%, 50%)',
                fries: 56,
                friesColor: 'hsl(29, 70%, 50%)',
                donut: 35,
                donutColor: 'hsl(50, 70%, 50%)',
            },
            {
                country: 'AL',
                'hot dog': 162,
                'hot dogColor': 'hsl(60, 70%, 50%)',
                burger: 178,
                burgerColor: 'hsl(56, 70%, 50%)',
                sandwich: 76,
                sandwichColor: 'hsl(310, 70%, 50%)',
                kebab: 184,
                kebabColor: 'hsl(81, 70%, 50%)',
                fries: 143,
                friesColor: 'hsl(129, 70%, 50%)',
                donut: 28,
                donutColor: 'hsl(276, 70%, 50%)',
            },
            {
                country: 'AM',
                'hot dog': 176,
                'hot dogColor': 'hsl(333, 70%, 50%)',
                burger: 189,
                burgerColor: 'hsl(127, 70%, 50%)',
                sandwich: 94,
                sandwichColor: 'hsl(100, 70%, 50%)',
                kebab: 48,
                kebabColor: 'hsl(197, 70%, 50%)',
                fries: 108,
                friesColor: 'hsl(316, 70%, 50%)',
                donut: 59,
                donutColor: 'hsl(291, 70%, 50%)',
            },
        ],
        keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
        indexBy: 'country',
        layout: {i: 'c', x: 0, y: 1, w: 3, h: 3, minW: 3, minH: 3},
        active: true,
        options: {
            colors: 'blues',
            defs: [
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ],
            fill: [
                //Colours specific ones differently.
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ],
            legends: 'keys',
            anchor: 'bottom-right',
            setting: 'theme',
        },
        chartName: "Another custom chart name, for chart 'c'",
    },
    {
        data: [
            {
                country: 'AD',
                'hot dog': 58,
                'hot dogColor': 'hsl(53, 70%, 50%)',
                burger: 93,
                burgerColor: 'hsl(155, 70%, 50%)',
                sandwich: 5,
                sandwichColor: 'hsl(248, 70%, 50%)',
                kebab: 107,
                kebabColor: 'hsl(4, 70%, 50%)',
                fries: 35,
                friesColor: 'hsl(265, 70%, 50%)',
                donut: 105,
                donutColor: 'hsl(155, 70%, 50%)',
            },
            {
                country: 'AE',
                'hot dog': 185,
                'hot dogColor': 'hsl(127, 70%, 50%)',
                burger: 3,
                burgerColor: 'hsl(86, 70%, 50%)',
                sandwich: 101,
                sandwichColor: 'hsl(281, 70%, 50%)',
                kebab: 103,
                kebabColor: 'hsl(19, 70%, 50%)',
                fries: 154,
                friesColor: 'hsl(356, 70%, 50%)',
                donut: 20,
                donutColor: 'hsl(41, 70%, 50%)',
            },
            {
                country: 'AF',
                'hot dog': 25,
                'hot dogColor': 'hsl(140, 70%, 50%)',
                burger: 175,
                burgerColor: 'hsl(220, 70%, 50%)',
                sandwich: 120,
                sandwichColor: 'hsl(104, 70%, 50%)',
                kebab: 37,
                kebabColor: 'hsl(170, 70%, 50%)',
                fries: 148,
                friesColor: 'hsl(118, 70%, 50%)',
                donut: 157,
                donutColor: 'hsl(338, 70%, 50%)',
            },
            {
                country: 'AG',
                'hot dog': 54,
                'hot dogColor': 'hsl(99, 70%, 50%)',
                burger: 181,
                burgerColor: 'hsl(101, 70%, 50%)',
                sandwich: 189,
                sandwichColor: 'hsl(145, 70%, 50%)',
                kebab: 89,
                kebabColor: 'hsl(64, 70%, 50%)',
                fries: 28,
                friesColor: 'hsl(108, 70%, 50%)',
                donut: 111,
                donutColor: 'hsl(355, 70%, 50%)',
            },
            {
                country: 'AI',
                'hot dog': 84,
                'hot dogColor': 'hsl(275, 70%, 50%)',
                burger: 6,
                burgerColor: 'hsl(35, 70%, 50%)',
                sandwich: 41,
                sandwichColor: 'hsl(325, 70%, 50%)',
                kebab: 87,
                kebabColor: 'hsl(91, 70%, 50%)',
                fries: 130,
                friesColor: 'hsl(27, 70%, 50%)',
                donut: 49,
                donutColor: 'hsl(92, 70%, 50%)',
            },
            {
                country: 'AL',
                'hot dog': 126,
                'hot dogColor': 'hsl(81, 70%, 50%)',
                burger: 69,
                burgerColor: 'hsl(2, 70%, 50%)',
                sandwich: 110,
                sandwichColor: 'hsl(266, 70%, 50%)',
                kebab: 100,
                kebabColor: 'hsl(212, 70%, 50%)',
                fries: 98,
                friesColor: 'hsl(341, 70%, 50%)',
                donut: 115,
                donutColor: 'hsl(55, 70%, 50%)',
            },
            {
                country: 'AM',
                'hot dog': 174,
                'hot dogColor': 'hsl(273, 70%, 50%)',
                burger: 174,
                burgerColor: 'hsl(257, 70%, 50%)',
                sandwich: 83,
                sandwichColor: 'hsl(157, 70%, 50%)',
                kebab: 152,
                kebabColor: 'hsl(157, 70%, 50%)',
                fries: 29,
                friesColor: 'hsl(287, 70%, 50%)',
                donut: 45,
                donutColor: 'hsl(214, 70%, 50%)',
            },
        ],
        keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
        indexBy: 'country',
        layout: {i: 'd', x: 0, y: 2, w: 3, h: 3, minW: 3, minH: 3},
        active: false,
        options: {
            colors: 'oranges',
            defs: [
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ],
            fill: [
                //Colours specific ones differently.
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ],
            legends: 'keys',
            anchor: 'bottom-right',
            setting: 'theme',
        },
    },
    {
        data: [
            {
                country: 'AD',
                'hot dog': 58,
                // 'hot dogColor': 'hsl(53, 70%, 50%)',
                burger: 93,
                // burgerColor: 'hsl(155, 70%, 50%)',
                sandwich: 5,
                // sandwichColor: 'hsl(248, 70%, 50%)',
                kebab: 107,
                // kebabColor: 'hsl(4, 70%, 50%)',
                fries: 35,
                // friesColor: 'hsl(265, 70%, 50%)',
                donut: 105,
                // donutColor: 'hsl(155, 70%, 50%)',
            },
            {
                country: 'AE',
                'hot dog': 185,
                // 'hot dogColor': 'hsl(127, 70%, 50%)',
                burger: 3,
                // burgerColor: 'hsl(86, 70%, 50%)',
                sandwich: 101,
                // sandwichColor: 'hsl(281, 70%, 50%)',
                kebab: 103,
                // kebabColor: 'hsl(19, 70%, 50%)',
                fries: 154,
                // friesColor: 'hsl(356, 70%, 50%)',
                donut: 20,
                // donutColor: 'hsl(41, 70%, 50%)',
            },
            {
                country: 'AF',
                'hot dog': 25,
                // 'hot dogColor': 'hsl(140, 70%, 50%)',
                burger: 175,
                // burgerColor: 'hsl(220, 70%, 50%)',
                sandwich: 120,
                // sandwichColor: 'hsl(104, 70%, 50%)',
                kebab: 37,
                // kebabColor: 'hsl(170, 70%, 50%)',
                fries: 148,
                // friesColor: 'hsl(118, 70%, 50%)',
                donut: 157,
                // donutColor: 'hsl(338, 70%, 50%)',
            },
            {
                country: 'AG',
                'hot dog': 54,
                // 'hot dogColor': 'hsl(99, 70%, 50%)',
                burger: 181,
                // burgerColor: 'hsl(101, 70%, 50%)',
                sandwich: 189,
                // sandwichColor: 'hsl(145, 70%, 50%)',
                kebab: 89,
                // kebabColor: 'hsl(64, 70%, 50%)',
                fries: 28,
                // friesColor: 'hsl(108, 70%, 50%)',
                donut: 111,
                // donutColor: 'hsl(355, 70%, 50%)',
            },
            {
                country: 'AI',
                'hot dog': 84,
                // 'hot dogColor': 'hsl(275, 70%, 50%)',
                burger: 6,
                // burgerColor: 'hsl(35, 70%, 50%)',
                sandwich: 41,
                // sandwichColor: 'hsl(325, 70%, 50%)',
                kebab: 87,
                // kebabColor: 'hsl(91, 70%, 50%)',
                fries: 130,
                // friesColor: 'hsl(27, 70%, 50%)',
                donut: 49,
                // donutColor: 'hsl(92, 70%, 50%)',
            },
            {
                country: 'AL',
                'hot dog': 126,
                // 'hot dogColor': 'hsl(81, 70%, 50%)',
                burger: 69,
                // burgerColor: 'hsl(2, 70%, 50%)',
                sandwich: 110,
                // sandwichColor: 'hsl(266, 70%, 50%)',
                kebab: 100,
                // kebabColor: 'hsl(212, 70%, 50%)',
                fries: 98,
                // friesColor: 'hsl(341, 70%, 50%)',
                donut: 115,
                // donutColor: 'hsl(55, 70%, 50%)',
            },
            {
                country: 'AM',
                'hot dog': 174,
                // 'hot dogColor': 'hsl(273, 70%, 50%)',
                burger: 174,
                // burgerColor: 'hsl(257, 70%, 50%)',
                sandwich: 83,
                // sandwichColor: 'hsl(157, 70%, 50%)',
                kebab: 152,
                // kebabColor: 'hsl(157, 70%, 50%)',
                fries: 29,
                // friesColor: 'hsl(287, 70%, 50%)',
                donut: 45,
                // donutColor: 'hsl(214, 70%, 50%)',
            },
        ],
        keys: ['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'],
        indexBy: 'country',
        layout: {i: 'e', x: 2, y: 2, w: 5, h: 5, minW: 3, minH: 3},
        active: false,
        options: {
            colors: 'dark2',
            defs: [
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ],
            fill: [
                //Colours specific ones differently.
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ],
            legends: 'keys',
            anchor: 'bottom-right',
            setting: 'theme',
        },
    },
];

//I have a const outside of the component ^ that gives the raw data, which is then loaded into a state and used to render the charts

//@see Currently working on: Edit chart, adding chart without issues, options menu etc.

function PrototypeGrid(props) {
    //#region
    //can change to localstorage to save to local storage when layout changes.
    //https://github.com/react-grid-layout/react-grid-layout/blob/master/test/examples/8-localstorage-responsive.jsx
    const ReactGridLayout = WidthProvider(Responsive);
    const [dataState, setDataState] = useState(dataRaw);

    const [showTableDialog, setShowTableDialog] = useState(false);
    const setTableDialogOpen = () => setShowTableDialog(true);
    const setTableDialogClose = () => setShowTableDialog(false);

    const [showEditDialog, setShowEditDialog] = useState(false);
    const setEditDialogOpen = () => setShowEditDialog(true);
    const setEditDialogClose = () => setShowEditDialog(false);

    const [activeData, setActiveData] = useState(
        dataState.filter((i) => i.active),
    );
    const [inactiveData, setInactiveData] = useState(
        dataState.filter((i) => !i.active),
    );

    const [currentData, setCurrentData] = useState(activeData[1]); //holds the current data to display to the modal window. Since editing is done elsewhere this doesnt exactly need to be dynamic.

    const toggleActive = (item, isActive) => {
        var toAdd = item;
        toAdd.active = isActive;
        var prevActive = [...activeData];
        var prevInactive = [...inactiveData];

        if (isActive) {
            prevInactive.splice(
                prevInactive.findIndex((i) => i.layout.i === item.layout.i),
                1,
            );
            prevActive.push(toAdd);
        } else {
            prevActive.splice(
                prevActive.findIndex((i) => i.layout.i === item.layout.i),
                1,
            );
            prevInactive.push(toAdd);
        }

        setActiveData(prevActive);
        setInactiveData(prevInactive);
    };

    const handleCallback = (childData) => {
        var prev = dataState.slice();
        prev.push(childData);
        setDataState(prev);
        setActiveData(dataState.filter((i) => i.active));
        setInactiveData(dataState.filter((i) => !i.active));        
        //Something's wrong here. it removes existing data. To do later, but gonna focus on editing.
    };

    const saveEditedItem = (item) => {
        var prev = dataState.slice();
        prev[prev.findIndex((i) => i.layout.i === item.layout.i)] = item;
        setDataState(prev);
    };

    const [showSnackbar, setSnackbar] = useState(false);
    const openSnackbar = () => setSnackbar(true);
    const closeSnackbar = () => setSnackbar(false);

    const onDrop = (layout, layoutItem, _event) => {
        _event.preventDefault();
        const data = _event.dataTransfer.getData('text');
        const item = inactiveData[data];

        item.layout = {
            i: item.layout.i,
            x: layoutItem.x,
            y: layoutItem.y,
            w: 3,
            h: 3,
            minW: 3,
            minH: 3,
        };
        console.log(item);
        toggleActive(item, true);
    };
    //#endregion

    return (
        <div>
            {/* no need to provide additional constraints, nivo inherits the initial width defined in layout */}
            {/* Regarding responsive grid layout
                If using this, the entire layout system needs to be regenerated to provide different layouts for:
                {lg: large screen, md: medium screen, sm: small screen, xxs: extra small screen}
                and provided to ReactGridLayout through the "layouts" prop.
                either that, or you have to provide the layout into the child elements.
            */}
            <Button onClick={openSnackbar}>snack</Button>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header">
                            <Typography>
                                {inactiveData.length} Disabled reports
                            </Typography>
                        </AccordionSummary>
                        {inactiveData.map((i, index) => {
                            return (
                                <div
                                    className="droppable-element"
                                    draggable="true"
                                    style={{
                                        width: 'inherit',
                                        padding: '5px',
                                        backgroundColor: 'darkgrey',
                                        margin: '2px',
                                        border: '1px solid white;',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                    }}
                                    onDragStart={(e) =>
                                        e.dataTransfer.setData('text', index)
                                    }
                                    id="testing"
                                    itemProp={i}
                                    key={i.layout.i}>
                                    <IconButton
                                        size="small"
                                        aria-label="close"
                                        color="inherit"
                                        onClick={() => {
                                            setCurrentData(i);
                                            setEditDialogOpen();
                                        }}>
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                    {i.chartName
                                        ? i.chartName
                                        : 'Untitled chart'}
                                </div>
                            );
                        })}
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header">
                            <Typography>
                                {activeData.length} Enabled reports
                            </Typography>
                        </AccordionSummary>
                        {activeData.map((i, index) => {
                            return (
                                <div
                                    className="droppable-element"
                                    style={{
                                        width: 'inherit',
                                        padding: '5px',
                                        backgroundColor: 'lightblue',
                                        margin: '2px',
                                        border: '1px solid white;',
                                        cursor: 'pointer',
                                        borderRadius: '5px',
                                    }}
                                    id="testing"
                                    itemProp={i}
                                    key={i.layout.i}>
                                    {i.chartName
                                        ? i.chartName
                                        : 'Untitled chart'}
                                </div>
                            );
                        })}
                    </Accordion>
                </Grid>
                <Grid item xs={10}>
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
                        {activeData.map((i) => {
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
                                            onClick={() =>
                                                toggleActive(i, false)
                                            }
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
                </Grid>
            </Grid>
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

            <EditChart
                open={showEditDialog}
                onClose={setEditDialogClose}
                data={currentData}
                onSave={saveEditedItem}
            />
            {/* add save callback */}
            <AddChartModal parentCallback={handleCallback} />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={showSnackbar}
                onClose={closeSnackbar}
                message="Delete"
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={closeSnackbar}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            />
        </div>
    );
}

export default React.memo(PrototypeGrid);
