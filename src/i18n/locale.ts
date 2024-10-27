import { createI18n } from "vue-i18n"

import zhCn from "./zh-cn"

export function createLocaleI18n() {
    return createI18n({
        locale: "zh-cn",
        messages: {
            zhCn
        },
        legacy: false
    })
}