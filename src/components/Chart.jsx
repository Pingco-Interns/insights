import React from 'react';
import {ResponsiveBarCanvas} from '@nivo/bar';
import PropTypes from 'prop-types';

//try to get the chart stuff in a responsive grid
function Chart(props) {
    // var colors;
    // if (props.options.setting === 'theme') {
    //     colors = {scheme : props.options.colors.toString()}
    // } else if(props.options.setting === 'custom') {
    //     props.options.custom.map((i) => (colors[i.id] = i.color)); 
    // }

    // console.log({["Colors object"]: colors, setting: props.options.setting, props: props.options})

    var _colors = {}

    if (props.options.setting === 'custom') {
        props.options.custom.map((i) => (_colors[i.id] = i.color));
    }else if(props.options.setting === 'theme'){
        _colors = {scheme: props.options.colors.toString()}
    }

    const getColor = bar => _colors[bar.id]
    
    return (
        <>
            <ResponsiveBarCanvas
                data={props.data}
                keys={props.keys}
                indexBy={props.indexBy}
                margin={{top: 30, right: 120, bottom: 70, left: 60}}
                padding={0.3}
                valueScale={{type: 'linear'}}
                indexScale={{type: 'band', round: true}}
                valueFormat={{format: '', enabled: false}}
                colors={props.options.setting === "custom" ? getColor : {scheme: props.options.colors.toString()}}
                defs={props.options.defs}
                fill={props.options.fill}
                borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                axisTop={null}
                axisRight={null}
                groupMode={props.options.groupMode}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: props.legendRight,
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: props.legendLeft,
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                // labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
                legends={[
                    {
                        dataFrom: props.options.legends,
                        anchor: props.options.anchor,
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </>
    );
}

Chart.propTypes = {
    data: PropTypes.array.isRequired,
    keys: PropTypes.array.isRequired,
    indexBy: PropTypes.string.isRequired,
    layout: PropTypes.exact({
        i: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        w: PropTypes.number.isRequired,
        h: PropTypes.number.isRequired,
    }),
    legendLeft: PropTypes.string,
    legendBottom: PropTypes.string,
    filters: PropTypes.arrayOf(PropTypes.object),
    options: PropTypes.exact({
        colors: PropTypes.oneOf([
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
        ]),
        custom: PropTypes.array,
        defs: PropTypes.arrayOf(PropTypes.object),
        fill: PropTypes.arrayOf(PropTypes.object),
        legends: PropTypes.string,
        anchor: PropTypes.oneOf([
            'top-left',
            'top',
            'top-right',
            'left',
            'center',
            'right',
            'bottom-left',
            'bottom',
            'bottom-right',
        ]),
        setting: PropTypes.string,
        groupMode: PropTypes.oneOf(['grouped', 'stacked']),
    }),
};

export default React.memo(Chart);
