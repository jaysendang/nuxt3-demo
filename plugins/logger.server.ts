/**
 * @description 日志
 */

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'

import * as winston  from  'winston'
import DailyRotateFile from 'winston-daily-rotate-file'

dayjs.extend(utc)

/**
 * @description 添加时间戳
 */
const appendTimestamp = winston.format((info) => {
  info.timestamp = dayjs().utcOffset(8).format('YYYY-MM-DD HH:mm:ss.SSS ZZ')

  return info
})

/**
 * @description 自定义格式化
 */
const customFormat = winston.format.printf((info) => {
  const { timestamp, level, message, ...meta } = info

  let metaStr = ''
  try {
    metaStr = JSON.stringify(meta)
  } catch (error) {}

  return `[${timestamp}] [${level.toUpperCase()}] [${message}] - ${metaStr}`
})

// 默认配置
const DEFAULT_OPTIONS = {
  dirname: 'logs',
  filename: 'nuxt3-demo.%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  format: winston.format.combine(
    appendTimestamp(),
    customFormat,
    winston.format.prettyPrint()
  ),
}

const apiTransport: DailyRotateFile = new DailyRotateFile({
  ...DEFAULT_OPTIONS,
  dirname: 'logs/api',
  filename: 'api.%DATE%.log',
})

const pageTransport: DailyRotateFile = new DailyRotateFile({
  ...DEFAULT_OPTIONS,
  dirname: 'logs/page',
  filename: 'page.%DATE%.log',
})

export default defineNuxtPlugin(async (nuxtApp) => {
  const apiLogger = winston.createLogger({
    transports: [
      apiTransport
    ]
  })

  const pageLogger = winston.createLogger({
    transports: [
      pageTransport
    ]
  })

  return {
    provide: {
      logger: {
        api: apiLogger,
        page: pageLogger
      },
    },
  }
})



