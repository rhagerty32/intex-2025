if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/intex-frontend/sw.js', { scope: '/intex-frontend/' })})}