<script lang="ts" setup>
import type { RawRouterBase } from '@/router/raw';
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';


const props = defineProps<{
    item: RawRouterBase
}>()

const isSubMenu = computed(() => {
    for (let i = 0; i < props.item.children.length; i++) {
        const element = props.item.children[i];
        if (element.showable) return true
    }

    return false
})

const children = computed(() => {
    return createIterable(props.item.children, source => {
        return source
    }, source => {
        // const f = source.permission == undefined ? true : authorization.hasPermission(source.permission)
        return source.showable
    })
})

const router = useRouter()

const onRoute = () => {
    if (props.item.defaultPath != undefined) {
        router.push({ name: props.item.children.find(it => it.path === props.item.defaultPath)?.name })
    } else {
        router.push({ name: props.item.name })
    }
}

</script>

<template>
    <el-sub-menu v-if="isSubMenu" :index="props.item.name">
        <template #title>
            <el-icon v-if="$props.item.icon">
                <component :is="$props.item.icon"></component>
            </el-icon>
            <span>{{ $t($props.item.label) }}</span>
        </template>
        <MainMenuV2Item v-for="ch in children" :item="ch"></MainMenuV2Item>
    </el-sub-menu>
    <el-menu-item v-else :index="props.item.name" @click="onRoute">
        <el-icon v-if="$props.item.icon">
            <component :is="$props.item.icon"></component>
        </el-icon>
        <template #title>
            <span>{{ $t($props.item.label) }}</span>
        </template>
    </el-menu-item>
</template>