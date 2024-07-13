(function () {
	'use strict';
	var item, customtabs = {
		movies: [
			{ name: "节目", id: "series", enabled: false, },
			{ name: "电影", id: "videos", enabled: true, },
			{ name: "推荐", id: "suggestions", enabled: true, },
			{ name: "预告片", id: "trailers", enabled: false, },
			{ name: "照片", id: "photos", enabled: false, },
			{ name: "专辑艺术家", id: "albumartists", enabled: false, },
			{ name: "艺术家", id: "artists", enabled: false, },
			{ name: "播放列表", id: "playlists", enabled: true, },
			{ name: "合集", id: "collections", enabled: true, },
			{ name: "风格", id: "genres", enabled: true, },
			{ name: "标签", id: "tags", enabled: true, },
			{ name: "最爱", id: "favorites", enabled: true, },
			{ name: "文件夹", id: "folders", enabled: true, },
		],
		tvshows: [
			{ name: "节目", id: "series", enabled: true, },
			{ name: "推荐", id: "suggestions", enabled: false, },
			{ name: "即将上映", id: "upcoming", enabled: false, },
			{ name: "最爱", id: "favorites", enabled: true, },
			{ name: "合集", id: "collections", enabled: false, },
			{ name: "风格", id: "genres", enabled: true, },
			{ name: "标签", id: "tags", enabled: true, },
			{ name: "网络", id: "studios", enabled: false, },
			{ name: "集", id: "episodes", enabled: true, },
			{ name: "文件夹", id: "folders", enabled: true, },
		],
		homevideos: [
			{ name: "节目", id: "series", enabled: false, },
			{ name: "视频", id: "videos", enabled: true, },
			{ name: "推荐", id: "suggestions", enabled: false, },
			{ name: "预告片", id: "trailers", enabled: false, },
			{ name: "照片", id: "photos", enabled: true, },
			{ name: "专辑艺术家", id: "albumartists", enabled: false, },
			{ name: "艺术家", id: "artists", enabled: false, },
			{ name: "播放列表", id: "playlists", enabled: false, },
			{ name: "合集", id: "collections", enabled: false, },
			{ name: "风格", id: "genres", enabled: false, },
			{ name: "标签", id: "tags", enabled: false, },
			{ name: "最爱", id: "favorites", enabled: false, },
			{ name: "文件夹", id: "folders", enabled: true, },
		],
		music: [
			{ name: "建议", id: "suggestions", enabled: false, },
			{ name: "专辑", id: "albums", enabled: true, },
			{ name: "专辑艺术家", id: "albumartists", enabled: true, },
			{ name: "艺术家", id: "artists", enabled: true, },
			{ name: "作曲家", id: "composers", enabled: false, },
			{ name: "播放列表", id: "playlists", enabled: true, },
			{ name: "风格", id: "genres", enabled: false, },
			{ name: "歌曲", id: "songs", enabled: true, },
			{ name: "标签", id: "tags", enabled: false, },
			{ name: "文件夹", id: "folders", enabled: true, },
		],
	};
	document.addEventListener("viewbeforeshow", function (e) {
		if (e.detail.path === "/videos" || e.detail.path === "/music" || e.detail.path === "/tv") {
			if (!e.detail.isRestored) {
				const mutation = new MutationObserver(async function () {
					item = e.target.controller?.item
					if (item) {
						mutation.disconnect();
						// !ApiClient.isMinServerVersion("4.8.0.60") && (customtabs.tvshows = customtabs.tvshows.filter(function (tab) { return tab.id !== "tags" }));
						let embytabs = document.querySelectorAll(".headerMiddle .main-tab-button");
						if (item.CollectionType === 'tvshows') {
							if (embytabs.length === 8) {
								customtabs.tvshows = customtabs.tvshows.filter(function (tab) { return tab.id !== "collections" && tab.id !== "tags" })
							} else if (embytabs.length === 9) {
								customtabs.tvshows = customtabs.tvshows.filter(function (tab) { return tab.id !== "tags" })
							}
						}
						let optionstab = customtabs[item.CollectionType];
						if (optionstab) {
							e.target.controller._tabs = optionstab;
							for (let i = 0; i < embytabs.length; i++) {
								if (!optionstab[i].enabled) {
									embytabs[i].classList.add("hide");
								} else {
									embytabs[i].textContent = optionstab[i].name;
								}

							}
						};
					}
				});
				mutation.observe(document.body, {
					childList: true,
					characterData: true,
					subtree: true,
				});
			} else {
				item = e.target.controller?.item;
			}
		}
	});
})()
