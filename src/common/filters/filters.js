import util from '../../libs/util'

/**
 * 格式化金额
 * @param str  eg:30000
 * @returns {*} eg:3,000.00
 */
export const formatNum = util.formatNum

/**
 * 格式化时间
 * @param val
 * @returns {*}
 */
export const timerFormat = util.timerFormat

/**
 * 格式化银行卡号 隔四位增减空格
 * @param val
 * @returns {*}
 * @constructor
 */
export const BankNo_Filter = util.BankNo_Filter


/**
 * 格式化银行  ****  ****  ****  ****  8903
 * @param val
 * @returns {*}
 * @constructor
 */
export const formatBankNo = util.formatBankNo


export const fromatMoneyFilter = util.fromatMoneyFilter

//
export const rateFormat = util.rateFormat
