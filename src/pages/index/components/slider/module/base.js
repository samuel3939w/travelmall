import { ELEMENT_NODE_TYPE, SLIDER_ANIMATION_CLASS_NAME } from './constants';

import DEFAULTS from './defaults';

class BaseSlider {
    constructor(el, options) {
        if (el.nodeType !== ELEMENT_NODE_TYPE) {
            throw new Error('實例化的時候, 請傳入DOM元素!');
        }

        // 實際參數
        this.options = {
            ...DEFAULTS,
            ...options
        }
        
        const sliderEl = el;
        const sliderContentEl = sliderEl.querySelector('.slider-content');
        const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item');
        // 添加到this上, 為了在方法中使用
        this.sliderEl = sliderEl;
        this.sliderContentEl = sliderContentEl;
        this.sliderItemEls = sliderItemEls;

        this.miniIndex = 0;
        this.maxIndex = sliderItemEls.length - 1;
        this.currIndex = this.getCorrectedIndex(this.options.initialIndex);

        // 每個slider-item的寬度(每次移動的距離)
        this.itemWidth = sliderItemEls[0].offsetWidth;

        this.init();
    }
    
    // 初始化
    init() {
        // 為每個slider-item設置寬度
        this.setItemsWidth();

        // 為slider-content設置寬度
        this.setContentWidth();

        // 切換到初始索引initialIndex
        this.move(this.getDistance());

        // 開啟動畫
        if (this.options.animation) {
            this.openAnimation();
        }

        // 自動切換
        if (this.options.autoplay) {
            this.autoplay();
        }
    }

    // 切換到index索引對應的幻燈片
    to(index) {
        index = this.getCorrectedIndex(index);
        if (this.currIndex === index) return;

        this.currIndex = index;
        const distance = this.getDistance();

        if (this.options.animation) {
            this.moveWithAnimation(distance);
        } else {
            this.move(distance);
        }
    }

    // 切換上一張
    prev() {
        this.to(this.currIndex - 1);
    }


    // 切換下一張
    next() {
        this.to(this.currIndex + 1);
    }

    // 自動切換
    autoplay() {
        const { autoplay } = this.options;
        if (autoplay <= 0) return;

        this.pause();
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, autoplay)
    }

    // 暫停自動切換
    pause() {
        clearInterval(this.autoplayTimer);
    }

    // 開啟動畫
    openAnimation() {
        this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME);
    }

    // 關閉動畫
    closeAnimation() {
        this.setAnimationSpeed(0);
    }

    // 設置切換動畫速度
    setAnimationSpeed(speed = this.options.speed) {
        this.sliderContentEl.style.transitionDuration = `${speed}ms`;
    }

    // 獲取要移動的距離
    getDistance(index = this.currIndex) {
        return -this.itemWidth * index;
    }

    // 不帶動化的移動
    move(distance) {
        this.sliderContentEl.style.transform = `translate3d(${distance}px,0px,0px)`
    }

    // 帶動化的移動
    moveWithAnimation(distance) {
        this.setAnimationSpeed();
        this.move(distance);
        this.sliderContentEl.addEventListener(
            'transitionend',
            () => {
                this.closeAnimation();
            },
            false
        );
    }

    // 為每個slider-item設置寬度
    setItemsWidth() {
        for (const item of this.sliderItemEls) {
            item.style.width = `${this.itemWidth}px`;
        }
    };

    // 每個slider-item的寬度(每次移動的距離)
    setContentWidth() {
        this.sliderContentEl.style.width = `${this.itemWidth * this.sliderItemEls.length}px`
    };

    // 獲取修正後的索引值
    getCorrectedIndex(index) {
        if (index < this.miniIndex) return this.maxIndex;
        if (index > this.maxIndex) return this.miniIndex;
        return index;
    }
}

export default BaseSlider;