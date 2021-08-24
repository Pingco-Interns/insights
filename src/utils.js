export function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function genString(length) {
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

export const themeArray = [
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
