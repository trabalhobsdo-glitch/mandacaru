/* Meta Pixel (Facebook) — PageView, ViewContent (página do produto), InitiateCheckout (checkout) e Purchase (em pedido.js). Carregar DEPOIS de config.js. */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1620017232920631');
fbq('track', 'PageView');

(function () {
  try {
    var C = window.CONFIG || {}, nome = C.produto || 'Produto', preco = C.preco || undefined;
    if (/checkout/i.test(location.pathname)) {
      var q = 1;
      try { q = Math.min(10, Math.max(1, parseInt(localStorage.getItem('mg_qty'), 10) || 1)); } catch (e) {}
      fbq('track', 'InitiateCheckout', {
        content_name: nome,
        content_type: 'product',
        num_items: q,
        value: preco ? Math.round(preco * q * 100) / 100 : undefined,
        currency: 'BRL'
      });
    } else {
      fbq('track', 'ViewContent', {
        content_name: nome,
        content_type: 'product',
        value: preco,
        currency: 'BRL'
      });
    }
  } catch (e) {}
})();
