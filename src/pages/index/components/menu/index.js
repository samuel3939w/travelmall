import menu_fn from './menu';
import './menu.css';

import render1 from './items1.art';
import {URL1} from './config';
import {getData} from 'api/getData';

const layoutEl1=document.querySelector('.v-menu-box .v-menu');

getData(URL1).then(data=>{
     //console.log(data);

    layoutEl1.innerHTML=render1(data);
    menu_fn();
});

// getData(URL2).then(data=>{
//     //console.log(data);

//    layoutEl2.innerHTML=render2(data);
// });