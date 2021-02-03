import render2 from './items2.art';
import { getData } from 'api/getData';
const layoutEl2 = document.querySelector('.v-menu-box .menus');

// 垂直菜单的实现
const menu_fn = function () {
    // 得到所有菜单触碰项li标签
    var menu_lis = document.querySelectorAll('#v-menu li[data-n]');
    // 得到vmenubox盒子
    var vmenubox = document.querySelector('#v-menu-box');
    // 得到所有menu菜单
    //var menus = document.querySelectorAll('#menus .menu');

    // 批量添加监听
    for (var i = 0; i < menu_lis.length; i++) {
        (function (i) {
            // 鼠标触碰某个菜单项
            menu_lis[i].onmouseenter = function () {
                // 所有菜单项去掉active类
                for (var j = 0; j < menu_lis.length; j++) {
                    menu_lis[j].className = '';
                }
                // 自己加active类
                this.className = 'active';
            
                var type = menu_lis[i].getAttribute('data-n');
                getData(`https://www.imooc.com/api/mall-PC/index/menu/${type}?icode=JBB84BCF17CE96BBA`).then(data => {
                    // console.log(data);
                    
                    layoutEl2.innerHTML = render2({
                        type: type,
                        data: data
                    });
                    // 每次重新渲染二級菜單,二級菜單的dom結構都是新生成的,所以重新獲取一下
                    var menus = document.querySelectorAll('#menus .menu');
                   // console.log(menus);
                    // 让所有菜单隐藏，去掉active类
                    for (var j = 0; j < menus.length; j++) {
                        menus[j].className = 'menu';
                    }
                    // 让序号相同的菜单项添加menu类
                    menus[i].className = 'menu active';
                });
            }
        })(i)
    }
    // 鼠标离开整个vmenubox盒子
    vmenubox.onmouseleave = function () {
        var menus = document.querySelectorAll('#menus .menu');
        // 让所有菜单隐藏
        for (var j = 0; j < menus.length; j++) {
            menus[j].className = 'menu';
        }
        // 所有菜单项去掉active类
        for (var j = 0; j < menus.length; j++) {
            menu_lis[j].className = '';
        }
    }
}

export default menu_fn;