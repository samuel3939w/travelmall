import './slider.css';
import './btn.css';

import Slider from './module';

import render from './slider.art';
import { getData,getDelayedData } from 'api/getData';

const layoutEl = document.getElementById('slider-layout');

getDelayedData('https://www.imooc.com/api/mall-PC/index/slider?icode=JBB84BCF17CE96BBA')
    .then(data => {
        //console.log(data);
        layoutEl.innerHTML = render({
            items: data
        });

        const slider = new Slider(document.querySelector('.slider'), {
            initialIndex: 1,
            animation: true,
            speed: 300,
            // 自動切換, 單位ms
            autoplay: 3000
        });
        const bannerEl = document.getElementById('banner');
        const leftbtnEl = document.getElementById('leftbtn');
        const rightbtnEl = document.getElementById('rightbtn');

        leftbtnEl.addEventListener('click', () => {
            slider.prev();
        }, false);

        rightbtnEl.addEventListener('click', () => {
            slider.next();
        }, false)

        bannerEl.addEventListener('mouseenter', () => {
            slider.pause();
        }, false);

        bannerEl.addEventListener('mouseleave', () => {
            slider.autoplay();
        }, false);
    })
