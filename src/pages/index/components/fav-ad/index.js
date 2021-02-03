import './favAd.css';

import render from './items.art';
import {URL} from './config';
import {getData} from 'api/getData';

const layoutEl=document.querySelector('.fav-ad .bd');

getData(URL).then(data=>{
     //console.log(data);

    layoutEl.innerHTML=render(data);
});