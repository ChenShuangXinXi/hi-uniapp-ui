/**
 * @descript Function 类型数据处理工具函数集
 *
 * @author 济南晨霜信息技术有限公司
 * @mobile 18560000860 / 18754137913
 *
 * @list 函数列表
 * ========================================================================================================================
 * = isFunction = 判断一个变量是否是函数类型
 * ========================================================================================================================
 */

/**
 * 判断一个数据是否是 Function 类型
 * @param {Any} variable 需要验证的数据
 * @returns {Boolean} true: 是Function 类型数据；false: 不是Function 类型数据；
 */
export const isFunction = (fn) => {
    return Object.prototype.toString.call(fn) === "[object Function]";
};
