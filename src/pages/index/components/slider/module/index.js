import BaseSlider from './base.js';
import keyboard from './keyboard.js';

// 繼承基類
class Slider extends BaseSlider {
    constructor(el, options) {
        super(el, options);

        this.bindEvent();
    }


    bindEvent() {
        keyboard.bindEvent(this);
    }
}

export default Slider;