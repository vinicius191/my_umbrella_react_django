const week = {'Sun': 'Sunday', 'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday', 'Thu': 'Thursday', 'Fri': 'Friday','Sat': 'Saturday'}

export const showTemp = (temp, temp_min) => {
    if(temp_min === null) {
        return Math.floor(temp);
    }

    if(temp === temp_min || Math.floor(temp) === Math.floor(temp_min)) {
        return Math.floor(temp_min) - (Math.floor(Math.random() * 7) + 1);
    }

}

export const showWind = (wind) => {
    if(typeof wind != 'undefined') {
        return wind;
    }

    return '0';
}

export const showRain = (rain) => {
    if(typeof rain != 'undefined') {
        return rain;
    }

    return '0';
}

export const getWeekDay = (dt) => {
    let d = new Date(dt * 1000);
    let fullDate = d.toDateString().split(' ');

    return week[fullDate[0]];
}

export const getFullDate = (dt) => {
    let d = new Date(dt * 1000);
    let fullDate = d.toDateString().split(' ');

    return fullDate[1] + ' ' + fullDate[2];
}

let am_pm = (dt) => {
    let d = new Date(dt * 1000)
    return d.getHours() >= 12 ? 1 : 0;
}

export const showIcon = (list, cod, dt) => {
    let result = list.find(({ id }) => id === cod);

    if(typeof result != 'undefined') {
        if(result.icon_class.split(' ').length > 1) {
            let i = am_pm(dt);

            return result.icon_class.split(' ')[i];
        } else {
            return result.icon_class;
        }
    }
    
    return list[0].icon_class;
}

export class Capitalize extends String {
    constructor(str){super(str)}

    capitalize = () => {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }
}