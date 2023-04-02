function setMode(mode) {
   const html = document.qs('html')
   if (mode=='dark') {
      html.style = "color-scheme: dark;";
      html.classList.add('dark');
      document.qsa('a').withText('Dark mode', txt=> txt.textContent='Light mode' )
   } else {
      document.qsa('a').withText('Light mode', txt=> txt.textContent='Dark mode' )
      html.style = "";
      html.classList.remove('dark');
   }
}

function toggleMode() {
   let mode;
   if (!document.qs('html').classList.contains('dark'))
      mode = 'dark';
   else
      mode = 'light';
   setMode(mode);
   localStorage.setItem('mode', mode);
}


function mainThings(x) {
   x.qsa('a').withText('ChatGPT Mar 14 Version', txt=> {
      txt.textContent = 'ChatDGPT Nightly Nightmare Version'
      txt.parentNode.href = 'https://github.com/mig1984/chatDGPT'
   })
}

function sideColumn(x) {
   x.qsa('a').withText('Clear conversations', txt=> {
      txt.parentNode.closest('a').onclick = function() { alert("Pekarová-Eidamová can not be cleared. She/it already is clean jako lilie."); return false; }
   })

   x.qsa('a').withText('Upgrade to Plus', txt=> {
      txt.textContent='Downgrade to Dumb'
      txt.parentNode.closest('a').onclick = function() { alert("Send 10000000 BTC to my účet u České spořitelny."); return false; }
   })

   x.qsa('a').withText('Light mode', txt=> {
      txt.parentNode.closest('a').onclick = toggleMode;
   })

   x.qsa('a').withText('Updates & FAQ', txt=> {
      txt.parentNode.closest('a').onclick = function() { alert(""); return false; }
   })

   x.qsa('a').withText('Log out', txt=> {
      txt.parentNode.closest('a').onclick = function() { alert("You can not log out of here. Never."); return false; }
   })
}

function replace(x) {
   document.qs('html').replaceWith(x.dom)
   setMode(localStorage.getItem('mode'))
}
