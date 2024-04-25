(function () {
    "use strict";
    var keydownFlag = false;
    var intervalId, viewnode, view,
        videoOsdVolumeControls,
        brightnessSlider,
        brightnessSliderContainer,
        videoOsdVolumeSliderWrapper,
        nowPlayingVolumeSlider,
        nowPlayingSliderValue,
        my_touches_type,
        my_touches_start,
        my_touches_value,
        my_touches_nowvalue,
        my_touches_rate,
        my_touches_time,
        dragByGuesture;
    const keyMap = {
        "ArrowRight": { rate: 2, message: "2.0 倍数" },
        "Right": { rate: 2, message: "2.0 倍数" },
        "NavigationRight": { rate: 2, message: "2.0 倍数" },
        "GamepadDPadRight": { rate: 2, message: "2.0 倍数" },
        "GamepadLeftThumbStickRight": { rate: 2, message: "2.0 倍数" },
        "GamepadLeftThumbstickRight": { rate: 2, message: "2.0 倍数" },
        "ArrowLeft": { rate: 1, message: "1.0 倍数" },
        "Left": { rate: 1, message: "1.0 倍数" },
        "NavigationLeft": { rate: 1, message: "1.0 倍数" },
        "GamepadDPadLeft": { rate: 1, message: "1.0 倍数" },
        "GamepadLeftThumbStickLeft": { rate: 1, message: "1.0 倍数" },
        "GamepadLeftThumbstickLeft": { rate: 1, message: "1.0 倍数" },
        "`": { rate: 1, message: "1.0 倍数" },
        "0": { rate: 1, message: "1.0 倍数" },
        "1": { rate: 1.5, message: "1.5 倍数" },
        "2": { rate: 2, message: "2.0 倍数" },
        "3": { rate: 2.5, message: "2.5 倍数" },
        "4": { rate: 3, message: "3.0 倍数" },
        "5": { rate: 3.5, message: "3.5 倍数" },
        "6": { rate: 4, message: "4.0 倍数" },
    };
    document.addEventListener("viewbeforeshow", function (e) {
        if (e.detail.type === "video-osd") {
            window.addEventListener("keydown", keydownEvent);
            window.addEventListener("keyup", keyupEvent);
            viewnode = e.target;
            view = viewnode.controller.videoOsd ?? viewnode.controller;
            videoOsdVolumeControls = viewnode.querySelector(".videoOsdVolumeControls"),
                brightnessSlider = viewnode.querySelector(".videoOsdBrightnessSlider"),
                brightnessSliderContainer = viewnode.querySelector(".brightnessSliderContainer"),
                videoOsdVolumeSliderWrapper = viewnode.querySelector(".videoOsdVolumeSliderWrapper"),
                nowPlayingVolumeSlider = viewnode.querySelector(".videoOsdVolumeSlider"),
                nowPlayingSliderValue = view.nowPlayingPositionSlider.valueAsNumber;
            my_touches_type = null;
            my_touches_start = null;
            my_touches_value = 0;
            my_touches_nowvalue = 0;
            my_touches_rate = null;
            my_touches_time = null;
            dragByGuesture = false;
            viewnode.addEventListener("touchstart", touchstartEvent);
            viewnode.addEventListener("touchmove", touchmoveEvent);
            viewnode.addEventListener("touchcancel", touchcancelEvent);
            viewnode.addEventListener("touchend", touchendEvent);
        } else {
            window.removeEventListener("keydown", keydownEvent);
            window.removeEventListener("keyup", keyupEvent);
            viewnode?.removeEventListener("touchstart", touchstartEvent);
            viewnode?.removeEventListener("touchmove", touchmoveEvent);
            viewnode?.removeEventListener("touchcancel", touchcancelEvent);
            viewnode?.removeEventListener("touchend", touchendEvent);
            viewnode = null, view = null;
        }
    });

    function keydownEvent(event) {
        var key = event.key;
        if (keydownFlag || !keyMap[key]) {
            return;
        }
        keydownFlag = true;
        var handleKeyDown = function () {
            var rate = keyMap[key].rate;
            var message = keyMap[key].message;
            require(["toast"], function (toast) {
                toast(message);
            });
            view.currentPlayer.setPlaybackRate(rate);
        };
        intervalId = setTimeout(handleKeyDown, 500);
    }
    function keyupEvent(event) {
        var key = event.key;
        if (keyMap[key]) {
            clearTimeout(intervalId);
            keydownFlag = false;
        }
    }
    function touchstartEvent(e) {
        nowPlayingSliderValue = view.nowPlayingPositionSlider.valueAsNumber;
        if (my_touches_start == null && !view.currentVisibleMenu && (!view.currentLockState || view.currentLockState === 0)) {
            brightnessSliderContainer.style.setProperty("display", "none", "important");
            videoOsdVolumeControls.style.setProperty("display", "none", "important");
            my_touches_type = null;
            my_touches_start = e.touches[0];
            my_touches_value = 0;
            my_touches_time = setTimeout(() => {
                if (
                    my_touches_type === null &&
                    my_touches_rate === null &&
                    !view.nowPlayingPositionSlider.dragging &&
                    Math.abs(e.touches[0].clientX - my_touches_start.clientX) < 10 &&
                    Math.abs(e.touches[0].clientY - my_touches_start.clientY) < 10 &&
                    touchRange(my_touches_start)
                ) {
                    window.navigator.vibrate(15);
                    view.currentPlayer.setPlaybackRate(2);

                    my_touches_rate = 2;
                    view.boundHideOsd();
                    require(["toast"], function (toast) {
                        toast("2.0 倍数");
                    });
                }
            }, 700);
        }
    }

    function touchmoveEvent(e) {
        if (dragByGuesture || (!view.nowPlayingPositionSlider.dragging && my_touches_start != null && my_touches_rate === null)) {
            var x = e.touches[0].pageX - my_touches_start.pageX;
            var y = e.touches[0].pageY - my_touches_start.pageY;
            if (touchRange(my_touches_start)) {
                if ((my_touches_type === null && Math.abs(x) > 20) || my_touches_type === "play") {
                    if (my_touches_type === null) {
                        my_touches_type = "play";
                        my_touches_start = e.touches[0];
                        my_touches_nowvalue = nowPlayingSliderValue;
                    } else {
                        my_touches_value = my_touches_func(e.touches[0], x, my_touches_nowvalue, screen.width, true);
                        dragByGuesture = true;
                        view.nowPlayingPositionSlider.beginEditing(my_touches_value);
                    }
                } else if (Math.abs(y) > 20 || my_touches_type === "volume" || my_touches_type === "bright") {
                    if ((Math.abs(x) < 20 && Math.abs(y) > 20 && my_touches_type === null && my_touches_start.pageX >= screen.width / 2) || my_touches_type === "volume") {
                        if (my_touches_type === null) {
                            my_touches_start = e.touches[0];
                            my_touches_type = "volume";
                            my_touches_nowvalue = view.currentPlayer.getVolume();
                            videoOsdVolumeControls.classList.add("videoOsdVolumeControls-showhover");
                            videoOsdVolumeControls.classList.remove("videoOsdVolumeControls-hidetouch", "hide");
                            videoOsdVolumeControls.style.setProperty("display", "flex", "important");
                            videoOsdVolumeSliderWrapper.style.setProperty("display", "flex", "important");
                        } else {
                            my_touches_value = Math.floor(my_touches_func(e.touches[0], y, my_touches_nowvalue, screen.height, false));
                            if (view.currentPlayer.getVolume() != my_touches_value) {
                                nowPlayingVolumeSlider.setValue(my_touches_value);
                                view.currentPlayer.setVolume(my_touches_value);
                            }
                        }
                        view.boundShowOsdDefaultParams();
                    } else if ((Math.abs(x) < 20 && Math.abs(y) > 20 && my_touches_type === null && my_touches_start.pageX < screen.width / 2) || my_touches_type === "bright") {
                        if (my_touches_type === null) {
                            my_touches_start = e.touches[0];
                            my_touches_type = "bright";
                            my_touches_nowvalue = view.currentPlayer.getBrightness();
                            brightnessSliderContainer.classList.remove("hide");
                            brightnessSliderContainer.style.setProperty("display", "flex", "important");
                        } else {
                            my_touches_value = Math.floor(
                                my_touches_func(e.touches[0], y, my_touches_nowvalue, screen.height, false)
                            );
                            if (view.currentPlayer.getBrightness() != my_touches_value) {
                                brightnessSlider.setValue(my_touches_value);
                                view.currentPlayer.setBrightness(my_touches_value);
                            }
                        }
                        view.boundShowOsdDefaultParams();
                    }
                }
            }
        }
    }

    function touchcancelEvent(e) {
        if (my_touches_start && (my_touches_value !== 0 || my_touches_type != null)) {
            if (my_touches_type === "play") {
                nowPlayingSliderValue = my_touches_value;
                view.nowPlayingPositionSlider.setValue(my_touches_value);
                view.nowPlayingPositionSlider.endEditing(!0, nowPlayingSliderValue);
                view.boundHideOsd();
            } else if (my_touches_type === "volume") {
                videoOsdVolumeControls.classList.add("videoOsdVolumeControls-hidetouch", "hide");
                videoOsdVolumeControls.style.setProperty("display", "none", "important");
                videoOsdVolumeSliderWrapper.style.setProperty("display", "none", "important");
            } else if (my_touches_type === "bright") {
                brightnessSliderContainer.style.setProperty("display", "none", "important");
            }
            my_touches_start = null;
            my_touches_type = null;
        }
        my_touches_start = null;
        if (my_touches_time != null) {
            clearTimeout(my_touches_time);
            my_touches_time = null;
        }
        if (my_touches_rate != null) {
            view.currentPlayer.setPlaybackRate(1);
            my_touches_rate = null;
        }
        dragByGuesture = false;
    }
    function touchendEvent(e) {
        if (my_touches_start && (my_touches_value !== 0 || my_touches_type != null)) {
            if (my_touches_type === "play") {
                window.navigator.vibrate(10);
                nowPlayingSliderValue = my_touches_value;
                view.nowPlayingPositionSlider.setValue(my_touches_value);
                view.nowPlayingPositionSlider.endEditing(!0, my_touches_value);
                view.boundHideOsd();
            } else if (my_touches_type === "volume") {
                window.navigator.vibrate(7);
                videoOsdVolumeControls.classList.add("videoOsdVolumeControls-hidetouch", "hide");
                videoOsdVolumeControls.style.setProperty("display", "none", "important");
                videoOsdVolumeSliderWrapper.style.setProperty("display", "none", "important");
            } else if (my_touches_type === "bright") {
                window.navigator.vibrate(7);
                brightnessSliderContainer.style.setProperty("display", "none", "important");
            }
            my_touches_start = null;
            my_touches_type = null;
        }
        my_touches_start = null;
        if (my_touches_time != null) {
            clearTimeout(my_touches_time);
            my_touches_time = null;
        }
        if (my_touches_rate != null) {
            view.currentPlayer.setPlaybackRate(1);
            my_touches_rate = null;
        }
        dragByGuesture = false;
    }
    function my_touches_func(e, v, t, x, s) {
        var step = (Math.abs(v) / (s ? x * 5 : x * 0.5)) * 100;
        step = v > 0 ? step : -step;
        v = s ? t + step : t - step;
        step = v >= 100 ? 100 : v <= 0 ? 0 : v;
        if (v >= 99 || v <= 1) {
            my_touches_start = e;
            my_touches_nowvalue = step;
        }
        return step;
    }
    function touchRange(touch) {
        var margin = 20;
        if (touch.clientX > margin &&
            touch.clientX < screen.width - margin &&
            touch.clientY > margin &&
            touch.clientY < screen.height - margin) {
            return true;
        }
        return false;
    }
})();
