let start = new Date("2020-9-1 14:00:53");
let inteval = 1;
let now = new Date();

let startf = new Date(start.toDateString());
let nowf = new Date(now.toDateString());

// 下一次执行时间
let nexttime = new Date(start.valueOf());

// 只有开始日期小于当前日期才需要计算下一次执行的时间
if (startf.getTime() < nowf.getTime()) {
    // 间隔时间
    let diffdays = (nowf.getTime() - startf.getTime()) / 1000 / 60 / 60 / 24;
    // 间隔时间段数
    let intevals = Math.floor((diffdays + inteval - 1) / inteval);
    // 间隔时间余数，注意向左是递减，向右是递增，eg. (...2,1)0(1,2,...)
    let intevalr = diffdays % inteval;

    nexttime.setDate(nexttime.getDate() + diffdays + inteval - intevalr);
} else if (startf.getTime() == nowf.getTime()) {
    if (nexttime.getTime() < new Date().getTime()) {
        nexttime.setDate(now.getDate() + inteval);
    }
}