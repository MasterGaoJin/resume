requirejs.config({
  baseUrl: './scripts',
  paths: {
    jquery: 'jquery',
    carousel:'carousel',
    gotop:'gotop'
  }
});

requirejs(['jquery','carousel','gotop'], function($,carousel,goTop) {
  carousel.init($(".carousel"));
  goTop.init();
});