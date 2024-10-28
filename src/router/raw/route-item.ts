import type { Component } from "vue";
import type { RouteRecordRaw } from "vue-router";
import "reflect-metadata";

const ROUTER_DECORATOR_NAME = "router:path"

export interface RouterRecordParams {
    path: string,
    name?: string
}

export function RouterRecord(params: string | RouterRecordParams) {
    const p = typeof params === "string" ? { path: params } : params

    return Reflect.metadata(ROUTER_DECORATOR_NAME, p)
}

export function RouterClass<T extends { new(...args: any[]): any }>(constructor: T) {
    const cls = class extends constructor {
        constructor(...args: any[]) {
            super(...args)

            Object.getOwnPropertyNames(this).forEach(n => {
                const ps = Reflect.getMetadata(ROUTER_DECORATOR_NAME, this, n) as (RouterRecordParams | undefined);
                if (ps != undefined) {
                    const item = (this as any)[n]
                    item.params = ps
                    item._parent = this
                    this._children.push(item as RawRouterBase)
                }
            })
        }
    }

    return cls
}

export abstract class RawRouterBase {
    protected params?: RouterRecordParams
    // permission?: AuthorizationPermission | AuthorizationPermission[]
    private _name?: string = undefined
    private _children: RawRouterBase[] = []
    private _parent?: RawRouterBase

    get name() {
        if (this._name == undefined && this.parent != undefined) {
            let p: RawRouterBase | undefined = this.parent
            // in this time. this.params is not null. 
            let a = (this.params!.name ?? this.params!.path)
            while (p != undefined) {
                a = p.name + "__" + a
                p = p.parent
            }
            this._name = a
        }

        return this._name ?? ""
    }

    get children() {
        return this._children
    }

    get path() {
        return this.params!.path
    }

    get parent() {
        return this._parent
    }

    readonly component?: Component = undefined
    abstract readonly label: string
    /**
     * メニューで表示、ディフォルトはtrue
     */
    readonly showable: boolean = true
    readonly defaultPath?: string = undefined
    readonly icon?: Component = undefined
    readonly props?: any = undefined

    toVueRoute(): RouteRecordRaw {
        return {
            name: this.name,
            component: this.component,
            path: this.path,
            children: this.children.length == 0 ? undefined : this.children.map(it => it.toVueRoute()),
            props: this.props,
            meta: { raw: this }
        } as RouteRecordRaw
    }
}