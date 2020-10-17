let start = new Date("2010/4/11 10:00:09");
let inteval = 10;
let now = new Date();
let weeks = "0";

// 初始到每周第一天，周日开头
let startf = new Date(start.toDateString());
startf.setDate(startf.getDate() - startf.getDay());
let nowf = new Date(now.toDateString());
nowf.setDate(nowf.getDate() - nowf.getDay());

// 下一次执行时间(周)
let nexttime = new Date(startf.valueOf());

if (weeks.length > 0) {
    // 从字符串提取要执行的星期数，并过滤掉空字符和日期
    let m_weeks = weeks.split(/[,|，]/).filter(item => (String(item) != '' && String(item) != ' ' && Number(item) < 7));
    // 如果包含有执行日期，就计算要执行的日期，否则设置为0
    if (m_weeks.length > 0) {
        // 先计算要执行日期所在的周，如果不在本周，则增加到最新的周
        if (startf.getTime() < nowf.getTime()) {
            // 间隔时间(天)
            let diffdays = (nowf.getTime() - startf.getTime()) / 1000 / 60 / 60 / 24;
            // 间隔时间(周)段数
            let intevals = Math.floor(((diffdays / 7) + inteval - 1) / inteval);
            // 间隔时间(周)余数，注意向左是递减，向右是递增，eg. (...2,1)0(1,2,...)
            let intevalr = (diffdays / 7) % inteval;
            // 初始化到起始日期
            nexttime = new Date(startf.valueOf());
            // 计算下一次执行所在的周
            if (intevalr == 0) {
                nexttime.setDate(nexttime.getDate() + diffdays);
            }
            else {
                nexttime.setDate(nexttime.getDate() + diffdays + (inteval - intevalr) * 7);
            }
        }

        // 开始计算具体日期
        let day = new Date().getDay();
        let _weeks = new Array(0);
        // 把星期几转为数字，保障是数字数组
        m_weeks.map(item => {
            _weeks.push(Number(item));
        });
        _weeks.sort();
        // 查看今天是否在规定星期数组里面
        let offset = _weeks.indexOf(Number(day));
        if (offset > -1) {
            // 如果周末不执行，那么就选择本周的其他日期
            if (nexttime.getTime() < new Date().getTime()) {
                if (offset + 1 == _weeks.length) {
                    nexttime.setDate(nexttime.getDate() + inteval * 7 + _weeks[0]);
                } else {
                    nexttime.setDate(nexttime.getDate() + _weeks[offset]);
                }
            } else {
                if (offset + 1 == _weeks.length) {
                    nexttime.setDate(nexttime.getDate() + _weeks[0]);
                } else {
                    nexttime.setDate(nexttime.getDate() + _weeks[offset]);
                }
            }
        } else {
            // 如果今天不执行,查找最近要执行的日期
            let n_weeks = new Array(0);
            n_weeks = n_weeks.concat(_weeks);
            n_weeks.push(Number(day));
            n_weeks.sort();
            offset = n_weeks.indexOf(Number(day));
            // 如果周末不执行，那么就选择本周的其他日期
            if (nexttime.getTime() < new Date().getTime()) {
                if (offset + 1 == n_weeks.length) {
                    nexttime.setDate(nexttime.getDate() + inteval * 7 + n_weeks[0]);
                } else {
                    nexttime.setDate(nexttime.getDate() + inteval * 7 + n_weeks[offset + 1]);
                }
            } else {
                if (offset + 1 == n_weeks.length) {
                    nexttime.setDate(nexttime.getDate() + n_weeks[0]);
                } else {
                    nexttime.setDate(nexttime.getDate() + n_weeks[offset + 1]);
                }
            }
        }
    } else {
        nexttime = 0;
    }

    // 设置执行的时间Time
    if (nexttime != 0) {
        nexttime = new Date(nexttime.toDateString() + " " + start.toTimeString());
    }
} else {
    nexttime = 0;
}








if (nexttime != 0)
    console.log(
        nexttime.getFullYear() +
        "-" +
        (nexttime.getMonth() + 1) +
        "-" +
        nexttime.getDate() +
        " " +
        nexttime.getHours() +
        ":" +
        nexttime.getMinutes() +
        ":" +
        nexttime.getSeconds());