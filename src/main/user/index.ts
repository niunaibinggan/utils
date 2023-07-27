const nameDesensitization = (name = '', type = 'middle', custom: any) => {
  if (!name) return name

  const toArr: string[] = [...name]

  if (custom) return custom(name)

  if (type === 'middle') {
    return toArr
      .map((item, index) => {
        if (index > 0 && (toArr.length < 3 || index < toArr.length - 1)) return (item = '*')
        return item
      })
      .join('')
  }

  if (type === 'end') {
    return toArr
      .map((item, index) => {
        if (index > 0) return (item = '*')
        return item
      })
      .join('')
  }

  if (type === 'start') {
    return toArr
      .map((item, index) => {
        if (index < toArr.length - 1) return (item = '*')
        return item
      })
      .join('')
  }
}

/**
 * @param no 接收的字符串（手机号/身份证号）
 * @param start 脱敏起始位置
 * @param end 脱敏结束位置（倒数位置）
 * @param replace 脱敏个数
 * @param split 脱敏标识
 * @returns string 脱敏后的字符串
 */

const numberDesensitization = (no = '', start = 3, end = 2, replace = 0, split = '*') => {
  if (!no) return no

  const toStr = no.toString()

  let targetStr = ''

  const rules = new RegExp(`(\\d{${start}})\\d*(\\d{${end}})`)

  const rulesReplace = new RegExp(`(\\d{${start}})\\d{${replace}}(\\d*)`)

  for (let i = 0; i < toStr.length; i++) {
    if (
      (replace && i > Number(start) && i <= Number(start) + Number(replace)) ||
      (!replace && i > Number(start) && i <= toStr.length - Number(end))
    )
      targetStr += split
  }

  return toStr.replace(replace ? rulesReplace : rules, `$1${targetStr}$2`)
}

const getSex = (no = '') => {
  if (!no) return no

  const toStr = no.toString()

  if (toStr.length < 17) return no

  return Number(toStr.substring(16, 17)) % 2 ? '男' : '女'
}

/**
 * @param no 接收的字符串（身份证号）
 * @param slipt 分割方式，默认：-
 * @param isDate 是否只显示月日，默认：false
 * @param isRreverse 是否为倒叙显示，如：日-月-年，默认：false
 * @returns string 脱敏后的字符串
 */

const getBirth = (no = '', slipt = '-', isDate = false, isRreverse = false) => {
  if (!no) return no

  const toStr = no.toString()

  const yearStr = toStr.substring(6, 10)

  const dateStr = `${toStr.substring(10, 12)}${slipt}${toStr.substring(12, 14)}`

  const reulst = isDate ? dateStr : `${yearStr}${slipt}${dateStr}`

  return isRreverse ? reulst.split(slipt).reverse().join(slipt) : reulst
}

const getAge = (no = '') => {
  if (!no) return no

  const toStr = no.toString()

  const birth = new Date(getBirth(toStr))

  const today = new Date()

  let age = today.getFullYear() - birth.getFullYear()

  if (
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() == birth.getMonth() && today.getDate() < birth.getDate())
  )
    age--

  return age
}

/**
 * @param no 接收的字符串（身份证号）
 * @param targetAge 目标年龄，默认：18
 * @returns boolean 是否满足年龄
 */
const isMeetAge = (no = '', targetAge = 18) => {
  if (!no) return no

  return Number(getAge(no)) < Number(targetAge)
}

export { nameDesensitization, numberDesensitization, getSex, getBirth, getAge, isMeetAge }
