import { dayjs } from "element-plus"
declare module "dayjs" {
    interface Dayjs {
        formatsPureDate(): string
        formatDateTimeString(): string
    }
}