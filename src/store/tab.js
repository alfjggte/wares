import Cookie from 'js-cookie'
export default ({
    state: {
        isCollapse: false,
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
            }
        ],
        current: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== "home") {
                state.current = val
                // 判断list里边有没有当前点击的元素？
                // 方法返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
                const result = state.tabList.findIndex(item => item.name === val.name)
                if (result == -1) {
                    state.tabList.push(val)
                }
            } else {
                state.current = null
            }
        },
        closeTag(state, val) {
            const result = state.tabList.findIndex(item => item.name === val.name);
            state.tabList.splice(result, 1)
        },
        clearTab(state) {
            state.tabList = [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                }
            ]
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            state.menu = JSON.parse(Cookie.get('menu'))
            const menuArray = []
            state.menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map((item) => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }


})
