<template>
	<div
		class="weather"
		v-if="weatherData.adCode.city && weatherData.weather.weather"
		@click="updateweather"
	>
		<span>{{ weatherData.adCode.city }}&nbsp;</span>
		<span>{{ weatherData.weather.weather }}&nbsp;</span>
		<span>{{ weatherData.weather.temperature }}℃</span>
		<span class="sm-hidden"
			>&nbsp;{{ weatherData.weather.winddirection }}&nbsp;</span
		>
		<span class="sm-hidden">{{ weatherData.weather.windpower }}&nbsp;</span>
	</div>
	<div class="weather" v-else @click="updateweather">
		<span>天气数据获取失败</span>
	</div>
</template>

<script setup>
import { onMounted, reactive, h } from "vue";
import { getAdcode, getWeather, getIpInfo, getCNcode } from "@/api";
import { Error } from "@icon-park/vue-next";

// 高德开发者 Key
let mainKey = import.meta.env.VITE_WEATHER_KEY;
let accuKey = import.meta.env.ACCU_WEATHER_KEY;

// 天气数据
let weatherData = reactive({
	adCode: {
		city: null, // 城市
		adcode: null, // 城市编码
	},
	weather: {
		weather: null, // 天气现象
		temperature: null, // 实时气温
		winddirection: null, // 风向描述
		windpower: null, // 风力级别
	},
});

let lastUpdateTime = 0;
let canShowMessage = true;

const updateweather = () => {
	const currentTime = Date.now();

	if (currentTime - lastUpdateTime < 30000) {
		// 小于30秒，需要等待
		if (canShowMessage) {
			ElMessage({
				type: "warning",
				message:
					"Please wait for another " +
					parseInt(30 - (currentTime - lastUpdateTime) / 1000) +
					" sec :)",
			});
			canShowMessage = false;
			setTimeout(() => {
				canShowMessage = true;
			}, 3000); // 1秒后允许再次显示提示
		}
		return;
	} else {
		getWeatherData();
		if (canShowMessage) {
			ElMessage({
				type: "success",
				message: "执行成功",
			});
			canShowMessage = false;
			setTimeout(() => {
				canShowMessage = true;
			}, 3000); // 1秒后允许再次显示提示
		}
	}

	console.log("天气更新已开始");

	getWeatherData();

	console.log("天气更新已结束");

	lastUpdateTime = currentTime; // 更新上次更新时间
};

// 获取天气数据
const getWeatherData = () => {
	// 获取地理位置信息
	getIpInfo()
		.then((ip_info) => {
			if (ip_info.country == "CN") {
				console.log(ip_info.ip);
				console.log(ip_info.country);
				console.log(ip_info.city);
				console.log("ok");
				getCNcode().then((cn_ipinfo) => {
					console.log("ok");
					if (!mainKey) return onError("请配置天气 Key");
					getAdcode(mainKey, cn_ipinfo.data.ip)
						.then((res) => {
							if (res.status) {
								weatherData.adCode = {
									city: res.city,
									adcode: res.adcode,
								};
								// 获取天气信息
								getWeather(mainKey, weatherData.adCode.adcode)
									.then((res) => {
										if (res.status) {
											weatherData.weather = {
												weather: res.lives[0].weather,
												temperature:
													res.lives[0].temperature,
												winddirection:
													res.lives[0].winddirection +
													"风",
												windpower:
													res.lives[0].windpower +
													"级",
											};
										} else {
											onError("天气信息获取失败");
										}
									})
									.catch(() => {
										onError("天气信息获取失败");
									});
							} else {
								onError("地理位置获取失败");
							}
						})
						.catch(() => {
							onError("地理位置获取失败");
						});
				});
			} else {
			}
		})
		.catch(() => {
			onError("IP获取失败");
		});
};

// 报错信息
const onError = (message) => {
	ElMessage({
		message: message,
		icon: h(Error, {
			theme: "filled",
			fill: "#efefef",
		}),
	});
	console.error(message);
};

onMounted(() => {
	// 调用获取天气
	getWeatherData();
});
</script>
