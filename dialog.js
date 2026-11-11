// ページの中に出す確認ダイアログ（alert / confirm の代わり。公開先では標準のダイアログが出ないため）
(function () {
  var css = '.dlg-back{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px}' +
    '.dlg{background:#fff;color:#222;border-radius:12px;max-width:360px;width:100%;padding:20px;box-shadow:0 8px 30px rgba(0,0,0,.35);font-size:15px;line-height:1.7}' +
    '.dlg p{margin:0 0 16px;white-space:pre-line}.dlg-row{display:flex;gap:8px;justify-content:flex-end}' +
    '.dlg button{padding:8px 18px;font-size:15px;border-radius:8px;border:1px solid #2d4f75;background:#4b78a8;color:#fff;cursor:pointer}' +
    '.dlg button.sub{background:#eee;color:#333;border-color:#bbb}.dlg button:focus-visible{outline:3px solid #f0a040}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  function open(msg, withCancel, onOk) {
    var back = document.createElement('div'); back.className = 'dlg-back';
    var box = document.createElement('div'); box.className = 'dlg'; box.setAttribute('role', 'dialog');
    var p = document.createElement('p'); p.textContent = msg; box.appendChild(p);
    var row = document.createElement('div'); row.className = 'dlg-row';
    function close() { back.remove(); }
    if (withCancel) {
      var c = document.createElement('button'); c.className = 'sub'; c.textContent = 'キャンセル'; c.onclick = close; row.appendChild(c);
    }
    var ok = document.createElement('button'); ok.textContent = 'OK';
    ok.onclick = function () { close(); if (onOk) onOk(); };
    row.appendChild(ok); box.appendChild(row); back.appendChild(box); document.body.appendChild(back); ok.focus();
  }
  window.demoAlert = function (msg) { open(msg, false); };
  window.demoConfirm = function (msg, onOk) { open(msg, true, onOk); };
})();
