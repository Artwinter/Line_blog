module.exports = {
    base: './',
    title: "召唤师峡谷",    
    head: [
        ['link', {
            rel: 'icon',
            href: './yasuo.jpg'
        }]
    ],
    themeConfig: {
        nav: [
            {
                text: '分类',
                items: [{
                        text: 'Html',
                        link: '/Html/'
                    },
                    {
                        text: 'Css',
                        link: '/Css/'
                    },
                    {
                        text: 'JavaScript',
                        link: '/JavaScript/'
                    },
                    {
                        text: 'Vue',
                        link: '/Vue/'
                    },
                    {
                        text: 'Vue3',
                        link: '/Vue3/'
                    },
                    {
                        text: 'TypeScript',
                        link: '/TypeScript/'
                    },
                ]
            },
            {
                text: '疑难杂惑',
                link: '/problem/01-problem/'
            },
            {
                text: 'Gitee',
                link: 'https://gitee.com/Artwinter/myBlog'
            }
        ],
        sidebar: {
            '/Html/': [{
                title: 'HTML入门',
                collapsable: true,
                // sidebarDepth: 1,
                children: [
                    '/Html/01',
                ]
            }],
            '/Css/': [{
                title: 'CSS入门',
                collapsable: true,
                // sidebarDepth: 1,
                children: [
                    '/Css/01',
                ]
            }],
            '/JavaScript/': [{
                title: 'JavaScript入门',
                collapsable: true,
                // sidebarDepth: 1,
                children: [
                    '/JavaScript/01',
                ]
            }],
            '/Vue/': [{
                title: 'Vue入门',
                collapsable: true,
                // sidebarDepth: 1,
                children: [
                    '/Vue/01',
                ]
            }],
            '/Vue3/': [{
                title: 'Vue3入门',
                collapsable: true,
                // sidebarDepth: 1,
                children: [
                    '/Vue3/01',
                ]
            }],
            '/TypeScript/': [{
                title: 'TypeScript入门',
                collapsable: true,
                // sidebarDepth: 1,
                children: [
                    '/TypeScript/01',
                ]
            }],
            '/problem/': [
                {
                    title: '问题整理',
                    collapsable: true,
                    children: ['01-problem']
                }
            ]
        },
        // sidebarDepth: 2
    }
}