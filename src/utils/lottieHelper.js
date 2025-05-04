import lottie from 'lottie-web';

export const setupLottie = (container, animationPath, options = {}) => {
  if (!container || !animationPath) return null;
  
  const defaultOptions = {
    container,
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: animationPath,
    ...options
  };
  
  try {
    return lottie.loadAnimation(defaultOptions);
  } catch (error) {
    console.error("Error loading lottie animation:", error);
    return null;
  }
};

export default lottie;