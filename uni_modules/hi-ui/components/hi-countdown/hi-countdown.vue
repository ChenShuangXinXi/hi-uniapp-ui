<!--
 * hi-countdown - 倒计时
 *
 * @author 济南晨霜信息技术有限公司
 * @mobile 18560000860 / 18754137913
 -->
<template>
    <view class="hi-countdown" :class="_classes" :style="_styles">
        <view class="hi-countdown__content" v-if="countdown?.isEnd && endText">
            <slot name="end" :countdown="countdown">
                {{ endText }}
            </slot>
        </view>
        <view class="hi-countdown__content" v-else>
            <slot>
                <view class="hi-countdown__number hi-countdown__number--days" v-if="showDays">
                    <slot name="days" :days="days">{{ days }}</slot>
                </view>
                <view class="hi-countdown__text hi-countdown__text--days" v-if="showDays">
                    <slot name="daysSeparator" :separator="separator?.days || ':'">{{ separator?.days || ":" }}</slot>
                </view>
                <view class="hi-countdown__number hi-countdown__number--hours" v-if="showHours">
                    <slot name="hours" :hours="hours">{{ hours }}</slot>
                </view>
                <view class="hi-countdown__text hi-countdown__text--hours" v-if="showHours">
                    <slot name="hoursSeparator" :separator="separator?.hours || ':'">{{ separator?.hours || ":" }}</slot>
                </view>
                <view class="hi-countdown__number hi-countdown__number--minutes" v-if="showMinutes">
                    <slot name="minutes" :minutes="minutes">{{ minutes }}</slot>
                </view>
                <view class="hi-countdown__text hi-countdown__text--minutes" v-if="showMinutes">
                    <slot name="minutesSeparator" :separator="separator?.minutes || ':'">{{ separator?.minutes || ":" }}</slot>
                </view>
                <view class="hi-countdown__number hi-countdown__number--seconds" v-if="showSeconds">
                    <slot name="seconds" :seconds="seconds">{{ seconds }}</slot>
                </view>
                <view class="hi-countdown__text hi-countdown__text--seconds" v-if="showSeconds && separator?.seconds">
                    <slot name="secondsSeparator" :separator="separator?.seconds || ':'">{{ separator?.seconds }}</slot>
                </view>
            </slot>
        </view>
    </view>
</template>

<!-- 由于 HbuilderX 不支持 defineOptions() 写法，故只能在此处进行配置 -->
<script>
    export default { options: uni?.$hi?.config?.componentsOptions ?? {} };
</script>

<script setup>
    import { ref, computed, onMounted, onBeforeUnmount, watch } from "vue";
    import props from "./props.js";
    import { formatCountdown } from "@/uni_modules/hi-functions";

    // 组件属性
    const _props = defineProps(props);

    // 组件事件
    const _emits = defineEmits(["change", "end"]);

    // 组件类名
    const _classes = computed(() => {
        const classes = [];
        return classes;
    });

    // 组件样式
    const _styles = computed(() => {
        const styles = [];
        return styles;
    });

    // 倒计时数据
    const countdown = ref(null);

    // keys
    const _keys = computed(() => {
        let keys = {};
        if (_props.mode.includes("dd")) keys.days = "dd";
        else keys.days = "d";
        if (_props.mode.includes("hh")) keys.hours = "hh";
        else keys.hours = "h";
        if (_props.mode.includes("mm")) keys.minutes = "mm";
        else keys.minutes = "m";
        if (_props.mode.includes("ss")) keys.seconds = "ss";
        else keys.seconds = "s";
        return keys;
    });

    // 判断是否显示天、小时、分钟、秒
    const showDays = computed(() => _props.mode.includes("dd") || _props.mode.includes("d"));
    const showHours = computed(() => _props.mode.includes("hh") || _props.mode.includes("h"));
    const showMinutes = computed(() => _props.mode.includes("mm") || _props.mode.includes("m"));
    const showSeconds = computed(() => _props.mode.includes("ss") || _props.mode.includes("s"));

    // 计算显示的天、小时、分钟、秒数据
    const days = computed(() => Number(countdown.value?.[_keys.value.days]));
    const hours = computed(() => {
        if (showDays.value) return Number(countdown.value?.[_keys.value.hours]);
        return days.value * 24 + Number(countdown.value?.[_keys.value.hours]);
    });
    const minutes = computed(() => {
        if (showHours.value) return Number(countdown.value?.[_keys.value.minutes]);
        return hours.value * 60 + Number(countdown.value?.[_keys.value.minutes]);
    });
    const seconds = computed(() => {
        if (showMinutes.value) return Number(countdown.value?.[_keys.value.seconds]);
        return minutes.value * 60 + Number(countdown.value?.[_keys.value.seconds]);
    });

    // 倒计时定时器
    let timer = null;

    // 监听数据提交事件
    watch(
        countdown,
        (newVal) => {
            _emits("change", newVal);
            if (newVal?.isEnd) {
                _emits("end");
                clearTimer();
            }
        },
        { immediate: true }
    );

    // 组件渲染完成后开始倒计时
    onMounted(() => {
        countdown.value = formatCountdown("d天hh时mm分ss秒", _props.endDate);
        timer = setInterval(() => {
            countdown.value = formatCountdown("d天hh时mm分ss秒", _props.endDate);
        }, 1000);
    });

    // 组件卸载之前清除定时器
    onBeforeUnmount(() => {
        clearTimer();
    });

    /**
     * 清除定时器
     */
    function clearTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
</script>

<style lang="scss" scoped>
    .hi-countdown {
        display: inline-flex;

        &__content {
            display: flex;
            align-items: center;
        }

        &__number {
            display: inline-flex;
        }

        &__text {
            display: inline-flex;
        }
    }
</style>
