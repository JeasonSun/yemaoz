import moment from 'moment'

export const DATEFORMAT = 'YYYY-MM-DD HH:mm:ss'

export function dateformat(val) {
  console.log('dateformat' + val);//这里的调试都没有执行

  return moment(val).format(DATEFORMAT);
}