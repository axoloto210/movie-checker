import dayjs from 'dayjs'

export function formatYYYYMMDD(dateString: Date) {
  return dayjs(dateString).format('YYYY年M月D日')
}
