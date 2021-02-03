import './ddwl.css';

import render from './items.art';
import {URL} from './config';
import {getData} from 'api/getData';

const layoutEl=document.querySelector('.ddwl .bd');

getData(URL).then(data=>{
    //console.log(data);

    layoutEl.innerHTML=render({
        one:data.one,
        col1:[data.items[0]],
        col2:[data.items[1],data.items[2],data.items[3]],
        col3:[data.items[4]],
        more:data.more,
        items:[data.more.items[0],data.more.items[1],data.more.items[2],data.more.items[3]]
    });
});