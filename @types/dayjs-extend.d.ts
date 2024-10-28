import { Dayjs } from "dayjs"
declare module "dayjs" {
    interface Dayjs {
        /**
         * 時間部分を戻る、ミリ秒単位
         */
        getTimeNumber(): number
        /**
         * HH:mm:ss
         */
        formatTime(): string
        /**
         * HH:mm
         */
        formatTimeWithoutSecond(): string
        /**
         * YYYY/mm/dd
         */
        formatDate(): string
        /**
         * YYYY/mm/dd HH:mm:ss
         */
        formatDateTime(): string
    }
}