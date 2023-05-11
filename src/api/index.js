// import axios from "axios";

/**
 * 音乐播放器
 */

// 获取音乐播放列表
export const getPlayerList = async (server, type, id) => {
	const res = await fetch(
		`${
			import.meta.env.VITE_SONG_API
		}?server=${server}&type=${type}&id=${id}`
	);
	return await res.json();
};

/**
 * 一言
 */

// 获取一言数据
export const getHitokoto = async () => {
	const res = await fetch("https://v1.hitokoto.cn");
	return await res.json();
};

/**
 * 天气
 */

// 获取高德地理位置信息
export const getAdcode = async (key, ip) => {
	const res = await fetch(
		`https://restapi.amap.com/v3/ip?ip=${ip}&key=${key}`
	);
	return await res.json();
};

// 获取高德地理天气信息
export const getWeather = async (key, city) => {
	const res = await fetch(
		`https://restapi.amap.com/v3/weather/weatherInfo?key=${key}&city=${city}`
	);
	return await res.json();
};

export const getAccucode = async (api_key, city, regionCode) => {
	const res = await fetch(
		`/backend-wea/locations/v1/cities/search?apikey=${api_key}&q=${city},${regionCode}`
	);
	return await res.json();
};

export const getAccuWeather = async (api_key, citykey) => {
	const res = await fetch(
		`/backend-wea/currentconditions/v1/${citykey}?apikey=${api_key}`
	);
	return await res.json();
};

export const getIpInfo = async () => {
	const res = await fetch(`/backend-ip/`);
	return await res.json();
};

export const getCNcode = async () => {
	const add_id = "opcquqnmlc0pjjgc"; // app_id
	const app_secret = "Y3VseDBQQTVNUmRIcS94RCtuV2ZKUT09"; // app_secret
	const res = await fetch(
		"https://www.mxnzp.com/api/ip/self?app_id=" +
			add_id +
			"&app_secret=" +
			app_secret
	);
	console.log("done");
	return await res.json();
};

/**
 * 获取配置
 */

// 获取社交链接
export const getSocialLinks = async () => {
	const res = await fetch("/socialLinks.json");
	return await res.json();
};
