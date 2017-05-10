define(['jquery'], function ($) {
  var Carousel = function () {
    function _Carousel($ct) {
      this.$ct = $ct;
      this.init();
      this.bind();
    }
    _Carousel.prototype.init = function () {
      var $btnPre = this.$btnPre = this.$ct.find(".btn-pre");
      var $btnNext = this.$btnNext = this.$ct.find(".btn-next");
      var $imgCt = this.$imgCt = this.$ct.find(".img-ct");
      var $dots = this.$dots = this.$ct.find(".dots");
      var $imgFirst = $imgCt.find("li").first().clone();
      var $imgLast = $imgCt.find("li").last().clone();
      var pageIndex = this.pageIndex = 0;
      var startLength = this.startLength = $imgCt.children().length;
      var imgLock = this.imgLock = false;
      $imgCt.prepend($imgLast);
      $imgCt.append($imgFirst);
      var $imgWidth = this.$imgWidth = $imgFirst.width();
      var imgLength = this.imgLength = $imgCt.children().length;
      $imgCt.width($imgWidth * imgLength);
      $imgCt.css("left", -$imgWidth + "px");
    }
    _Carousel.prototype.imgPre = function (count) {
      _this = this;
      this.$imgCt.animate({ "left": "+=" + this.$imgWidth * count },
        function () {
          _this.pageIndex -= count;
          if (_this.pageIndex < 0) {
            _this.$imgCt.css("left", "-=" + _this.$imgWidth * _this.startLength);
            _this.pageIndex = _this.startLength - 1;
          }
          _this.imgLock = false;
          _this.dotsActive();
        })
    }
    _Carousel.prototype.imgNext = function (count) {
      _this = this;
      this.$imgCt.animate({ "left": "-=" + this.$imgWidth * count },
        function () {
          _this.pageIndex += count;
          if (_this.pageIndex === _this.startLength) {
            _this.$imgCt.css("left", -_this.$imgWidth + "px");
            _this.pageIndex = 0;
          }
          _this.imgLock = false;
          _this.dotsActive();
        }
      );
    }
    _Carousel.prototype.bind = function () {
      _this = this;
      this.$btnPre.on("click", function (e) {
        if (_this.imgLock) {
          return;
        }
        _this.imgLock = true;
        e.preventDefault;
        _this.imgPre(1);
      })
      this.$btnNext.on("click", function (e) {
        if (_this.imgLock) {
          return;
        }
        _this.imgLock = true;
        e.preventDefault;
        _this.imgNext(1);
      })
      this.$dots.on("click", "li", function (e) {
        var index = $(e.target).index();
        if (index > _this.pageIndex) {
          _this.imgNext(index - _this.pageIndex);
        } else {
          _this.imgPre(_this.pageIndex - index);
        }
      })
    }
    _Carousel.prototype.dotsActive = function () {
      this.$dots.children().removeClass("active");
      this.$dots.children().eq(this.pageIndex).addClass("active");
    }
    return {
      init: function ($ct) {
        $ct.each(function (index, node) {
          console.log($(node));
          new _Carousel($(node));
        })
      }
    }
  }();
  return Carousel;
})