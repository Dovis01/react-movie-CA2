import backgroundMainImage from '../images/pexels-eberhard-grossgasteiger-1366919.jpg';
import backgroundCardImage from '../images/pexels-laura-tancredi-7078717.jpg';

const backgroundImageStyles = {
    backgroundMainContainer: {
        backgroundImage: `url(${backgroundMainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        zIndex: -1,
        position: 'absolute',
        right: 0,
        left: 0,
    },
    backgroundCardContainer: {
        backgroundImage: `url(${backgroundCardImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -1,
    },
    backgroundDetailContainer:{
        backgroundColor: 'rgba(219,232,240,0.7)',
        position: 'fixed', // 使用 fixed 而不是 absolute 以确保它覆盖整个屏幕
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
    },
};

export default backgroundImageStyles;