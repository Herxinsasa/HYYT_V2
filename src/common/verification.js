//验证手机号码
export function vMobile(text) {
	var reg = /^1[3456789]\d{9}$/;
	if (text === '' || !reg.test(text)) {
		return false;
	} else {
		return true;
	}
}
//验证字符串长度
export function vLength(text, min, max) {
	var length = text.length;
	if (length < min || length > max) {
		return false;
	} else {
		return true;
	}
}
//验证字符串大小
export function vSize(text, min, max) {
	if (text < min || text > max) {
		return false;
	} else {
		return true;
	}
}

//验证是否为空
export function vEmpty(text, _default) {
	if (text == '' || text == _default) {
		return false;
	} else {
		return true;
	}
}

//验证昵称 数字，大小写字母，汉字下，划线
export function vNickName(text) {
	var reg = /^(\w+)|([\u0391-\uFFE5]+){2}$/;
	if (text === '' || !reg.test(text)) {
		return false;
	} else {
		return true;
	}
}

//验证中文姓名
export function vChinaName(text) {
	var reg = /^([\u4e00-\u9fa5]){2,7}$/;
	if (text === '' || !reg.test(text)) {
		return false;
	} else {
		return true;
	}
}

//验证身份证号
export function vCard(text) {
	var reg = /^[1-9]\d{5}((19\d{2})|20((0[0-9])|(1[0-8])))(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])\d{3}(\d|X)$/;
	if (text === '' || !reg.test(text)) {
		return false;
	} else {
		return true;
	}
}
//验证密码
export function vpwd(text) {
	var reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;
	if (text === '' || !reg.test(text)) {
		return false;
	} else {
		return true;
	}
}
//验证邀请码
export function vInvitation(text) {
	var reg = /^[a-zA-Z0-9]{1,20}$/;
	if (text === '' || !reg.test(text)) {
		return false;
	} else {
		return true;
	}
}
// 验证只能是汉字
export function vChinese(text) {
	var reg = /^[\u4e00-\u9fa5]+$/;
	if (text === '' || !reg.test(text)) {
		return false;
	} else {
		return true;
	}
}
