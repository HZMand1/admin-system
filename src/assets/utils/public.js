/**
 * 公共js
 */
import router from "../../router"
//返回上一个页面
const Fun = {
	// 返回
	goBack() {
		router.go(-1);
	},
	// 转换时间戳
	formatDate(date, fmt) {
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (String(date.getFullYear())).substr(4 - RegExp.$1.length));
		}
		let o = {
			"M+": date.getMonth() + 1,
			"d+": date.getDate(),
			"h+": date.getHours(),
			"m+": date.getMinutes(),
			"s+": date.getSeconds()
		};
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = String(o[k]);
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
			}
		}
		return fmt;
	},
	padLeftZero(str) {
		return ("00" + str).substr(str.length);
	}
}

export default Fun;