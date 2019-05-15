import palette from '../configs/colorsPalette';

export default (theme='main') => {
    return palette[theme]||palette['main'];
};