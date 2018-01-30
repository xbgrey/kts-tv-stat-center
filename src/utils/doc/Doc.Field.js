/**
 * Format Time, yyyy-MM-dd hh:mm:ss
 * @param timeStr
 * @returns {*}
 */
const formatTime = (timeStr) => {
    if (timeStr.indexOf('T') < 0 || timeStr.indexOf('.') < 0) {
        return timeStr;
    } else {
        // 2017-06-13T19:39:53.738995Z
        const time = timeStr.split('.')[0].replace('T', ' ')
        return time;
    }
};


/**
 * Format Date, yyyy-MM-dd
 * @param timeStr
 * @returns {*}
 */
const formatDate = (timeStr) => {
    if (timeStr) {
        if (timeStr.indexOf('T') < 0) {
            return timeStr;
        } else {
            return timeStr.split('T')[0];
        }
    }
};


/**
 * 是否是最近更新，默认最近两天
 * Is it the latest update
 * @param time, 2003-04-04 T19:39:53.738995Z
 * @returns {*}
 */
const isLatestUpdate = (timeStr, period = 48) => {
    // get current time
    const nowTime = new Date();

    // get input time
    const inputTime = formatTime(timeStr);

    // get time difference
    const yyyy = inputTime.split(' ')[0].split('-')[0];
    const mth = inputTime.split(' ')[0].split('-')[1];
    const dd = inputTime.split(' ')[0].split('-')[2];
    const hh = inputTime.split(' ')[1].split(':')[0];
    const mm = inputTime.split(' ')[1].split(':')[1];
    const ss = inputTime.split(' ')[1].split(':')[2];
    const oldTime = new Date(yyyy, mth, dd, hh, mm, ss);
    const diff = nowTime.getTime() - oldTime.getTime();

    // is in period
    if (diff > period * 3600 * 1000) {
        return false;
    }
    else {
        return true;
    }
};


/**
 * Format Amount
 * @param amount
 * @param decimal places, length after point
 * @returns {*}
 */
const formatMoney = (s, n) => {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\\.-]/g, "")).toFixed(n) + "";
    const l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    //
    return t.split("").reverse().join("") + "." + r;
};

/**
 * Format Amount
 * @param amount
 * @param decimal places, length after point
 * @returns {*}
 */
const formatMoneyInt = (s, n=0) => {
    n = n >= 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\\.-]/g, "")).toFixed(n) + "";
    const l = s.split(".")[0].split("").reverse();
    let t = "";
    for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    //
    return t.split("").reverse().join("");
};


/**
 * Reverse Format Amount
 * @param amount
 * @returns {*}
 */
const reverseFormatMoney = (s) => {
    return parseFloat(s.replace(/[^\d\\.-]/g, ""));
};

export default {
    isLatestUpdate,
    formatMoney,
    reverseFormatMoney,
    formatDate,
    formatTime,   
    formatMoneyInt,
}
