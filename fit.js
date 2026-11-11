// 元サイトと同じく横幅を固定し、画面が狭いときは折り返さずに全体を縮小して表示する
// （iPadのSafariでも崩れないよう、zoomではなくtransformで縮小する）
(function () {
  var st = document.createElement('style');
  st.textContent = 'html{-webkit-text-size-adjust:100%;text-size-adjust:100%}body{overflow-x:hidden}' +
    '.fit-box{overflow:hidden}[data-fit]{transform-origin:0 0}';
  document.head.appendChild(st);

  var targets = [].slice.call(document.querySelectorAll('[data-fit]'));
  targets.forEach(function (el) {
    var box = document.createElement('div');
    box.className = 'fit-box';
    el.parentNode.insertBefore(box, el);
    box.appendChild(el);
  });

  function fit() {
    var vw = document.documentElement.clientWidth || window.innerWidth;
    targets.forEach(function (el) {
      var w = +el.getAttribute('data-fit');
      var s = Math.min(1, vw / w);
      el.style.width = w + 'px';
      el.style.transform = s < 1 ? 'scale(' + s + ')' : '';
      el.parentNode.style.height = s < 1 ? Math.ceil(el.offsetHeight * s) + 'px' : '';
    });
  }
  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
})();
