/**
 * 组件属性
 *
 * @author 济南晨霜信息技术有限公司
 * @mobile 18560000860 / 18754137913
 */
export default {
    // 组件中按钮的 hover-class
    hoverClass: {
        type: String,
        default: "hi-hover"
    },

    // 标题文本
    title: {
        type: String,
        default: undefined
    },

    // 是否开启默认标题
    // 开启后如果未设置 title 属性，会显示在 pages.json 对应页面中配置的 style.navigationBarTitleText，如果 style.navigationBarTitleText 也没有配置，则会继续寻找 pages.json 中配置的 globalStyle.navigationBarTitleText
    autoTitle: {
        type: Boolean,
        default: true
    },

    // 标题对齐模式。只支持左对齐（left）和居中对齐（center）
    align: {
        type: String,
        default: "center"
    },

    // 是否显示返回按钮？
    showBack: {
        type: Boolean,
        default: true
    },

    // 是否点击返回按钮后自动返回？
    autoBack: {
        type: Boolean,
        default: true
    },

    // 是否自动判断是否显示返回按钮？
    // 判断逻辑为：当前页面是 tabBar 页面或 getCurrentPages().length <= 1 时，不显示返回按钮，否则显示
    autoShowBack: {
        type: Boolean,
        default: true
    },

    // 返回按钮文字
    backText: {
        type: String,
        default: ""
    },

    // 返回按钮图标名称
    backIconName: {
        type: String,
        default: "__zuo"
    },

    // 左侧菜单数据
    // 数据格式为：
    // item.class: [String, Array, Object] 按钮的 class
    // item.style: [String, Array, Object] 按钮样式
    // item.hoverClass: [String] 按钮的 hover-class
    // item.iconName: [String] 按钮图标名称
    // item.iconStyle: [String, Array, Object] 按钮图标的样式
    // item.text: [String] 按钮文本
    // item.textStyle: [String, Array, Object] 按钮文本的样式
    leftMenu: {
        type: [Array, Object],
        default: () => null
    },

    // 右侧菜单数据
    // 数据格式参考上方 leftMenu
    rightMenu: {
        type: [Array, Object],
        default: () => null
    }
};
