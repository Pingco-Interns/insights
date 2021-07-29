import React, {useState} from 'react';
import RGL, {WidthProvider} from 'react-grid-layout';

import Chart from './Chart';
import AddChartModal from './AddChartModal';
import TableRender from './TableRender';

import Button from '@material-ui/core/Button';
import TableChartIcon from '@material-ui/icons/TableChart';
import DragHandleIcon from '@material-ui/icons/DragHandle';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Tooltip } from '@material-ui/core';

//Need to show modal and dialog windows with the table here. If not, it'll be constrainted to the chart's div and not to the viewport.

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
        layout: {i: 'a', x: 1, y: 0, w: 2, h: 2},
        options: {
            colors: "nivo",
            defs: [
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
                }
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
            legends: "keys",
            anchor: "bottom-right"
        },
        chartName: "Chart 1 custom name, index is 'a'"
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
        layout: {i: 'b', x: 2, y: 0, w: 3, h: 3},
        options: {
            colors: "pastel1",
            defs: [
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
                }
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
            legends: "keys",
            anchor: "bottom-right"
        }
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
        layout: {i: 'c', x: 0, y: 1, w: 5, h: 2},
        options: {
            colors: "blues",
            defs: [
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
                }
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
            legends: "keys",
            anchor: "bottom-right"
        },
        chartName: "Another custom chart name, for chart 'c'"
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
        layout: {i: 'd', x: 0, y: 2, w: 2, h: 2},
        options: {
            colors: "oranges",
            defs: [
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
                }
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
            legends: "keys",
            anchor: "bottom-right"
        }
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
        layout: {i: 'e', x: 2, y: 2, w: 5, h: 5},
        options: {
            colors: "dark2",
            defs: [
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
                }
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
            legends: "keys",
            anchor: "bottom-right"
        }
    }
];

//I have a const outside of the component ^ that gives the raw data, which is then loaded into a state and used to render the charts
function PrototypeGrid(props) {
    const butStyle = {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    };
    const ReactGridLayout = WidthProvider(RGL);

    const [dataProcessed, setData] = useState(dataRaw);

    const [layoutList, setLayoutList] = useState(dataProcessed.map((i)=>i.layout)) //layout defines the positions for each element.
    const curLayout = layoutList

    const [currentData, setCurrentData] = useState({
        keys: dataProcessed[0].keys,
        data: dataProcessed[0].data,
    }); //holds the current data to display to the modal window. Since editing is done elsewhere this doesnt exactly need to be dynamic.

    const [showTableDialog, setShowTableDialog] = useState(false);
    const setTableDialogOpen = () => setShowTableDialog(true);
    const setTableDialogClose = () => setShowTableDialog(false);

    return (
        <div>
            {/* no need to provide additional constraints, nivo inherits the initial width defined in layout */}
            {/* need to split this into components as well, getting a wee bit messy */}

            <ReactGridLayout
                style={{border: '1px solid grey'}}
                className="layout"
                layout={curLayout}
                cols={15} //the more rows and columns there are, the more division within the div to move around in.
                rows={15}
                rowHeight={100}
                width={1200}
                // onLayoutChange={(layout)=>{
                //     if (layout !== layoutList) {
                //         setLayoutList(layout)
                //     } 
                // }} 
                //need to figure out a good way to save layouts. using state results in it rerendering from scratch every time its updated.
                //maybe send it to server than updating a stateful layout?
                // draggableCancel="nonDraggable"
                draggableHandle=".draggableHandle">
                {dataRaw.map((i) => {
                    return (
                        <div style={{border: '1px solid black'}} key={i.layout.i}>
                            <Tooltip title="Drag chart">
                                <div
                                    id="handle"
                                    className="draggableHandle"
                                    style={{
                                        textAlign: 'center',
                                        backgroundColor: 'lightgray',
                                        minWidth: '100%',
                                        minHeight: '25px',
                                        position: 'fixed',
                                        cursor: 'pointer',
                                    }}>
                                    <DragHandleIcon />
                                    {i.chartName? i.chartName : "Untitled chart"}
                                </div>
                            </Tooltip>
                            <Tooltip title="Show table">
                                <Button
                                    size="medium"
                                    onClick={(e) => {
                                        setTableDialogOpen();
                                        setCurrentData({
                                            keys: i.keys,
                                            data: i.data,
                                        });
                                    }}>
                                    <TableChartIcon fontSize="inherit" />
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
                <DialogTitle id="form-dialog-title">Chart Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Chart data:</DialogContentText>
                    <TableRender data={currentData} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={setTableDialogClose} color="default">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <AddChartModal />

        </div>
    );
}

export default PrototypeGrid;
