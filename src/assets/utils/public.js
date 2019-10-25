/**
 * 公共js
 */
import router from "../../router"
//返回上一个页面
const Fun = {
	goBack() {
		router.go(-1);
	}
}

export default Fun;