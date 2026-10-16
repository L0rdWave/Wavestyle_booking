export function initPwaInstall() {
  const installButton = document.getElementById('pwa-install-button');
  const installDialog = document.getElementById('pwa-install-dialog');
  const closeButton = document.getElementById('pwa-install-close');
  const instructions = document.getElementById('pwa-install-instructions');
  if (!installButton || !installDialog || !closeButton || !instructions) return;

  const userAgent = navigator.userAgent;
  const isIos = /iphone|ipad|ipod/i.test(userAgent)
    || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isAndroid = /android/i.test(userAgent);
  const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  let deferredInstallPrompt;

  const showInstallHelp = () => {
    if (isIos) {
      instructions.textContent = 'En Safari, tocá Compartir (el cuadrado con la flecha hacia arriba), elegí “Agregar a pantalla de inicio” y confirmá. Después abrí Wavestyle desde el nuevo icono.';
    } else if (isAndroid) {
      instructions.textContent = 'En el menú ⋮ del navegador, elegí “Instalar aplicación” o “Agregar a pantalla principal” y confirmá. El icono abre Wavestyle a pantalla completa.';
    } else {
      instructions.textContent = 'En Chrome o Edge, usá el icono Instalar de la barra de direcciones o elegí “Instalar Wavestyle” en el menú del navegador.';
    }

    if (typeof installDialog.showModal === 'function') {
      installDialog.showModal();
    } else {
      installDialog.setAttribute('open', '');
    }
  };

  const handleBeforeInstallPrompt = event => {
    event.preventDefault();
    deferredInstallPrompt = event;
  };

  const handleAppInstalled = () => {
    installButton.hidden = true;
    deferredInstallPrompt = undefined;
  };

  const handleInstallClick = async () => {
    if (!deferredInstallPrompt) {
      showInstallHelp();
      return;
    }

    try {
      await deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = undefined;
      if (choice.outcome === 'accepted') installButton.hidden = true;
    } catch (error) {
      console.error('No se pudo abrir la instalación de Wavestyle:', error);
      showInstallHelp();
    }
  };

  const closeInstallHelp = () => {
    if (typeof installDialog.close === 'function') {
      installDialog.close();
    } else {
      installDialog.removeAttribute('open');
    }
  };

  const handleDialogClick = event => {
    if (event.target === installDialog) closeInstallHelp();
  };

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);
  installButton.addEventListener('click', handleInstallClick);
  closeButton.addEventListener('click', closeInstallHelp);
  installDialog.addEventListener('click', handleDialogClick);
  installButton.hidden = isStandalone();

  return () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.removeEventListener('appinstalled', handleAppInstalled);
    installButton.removeEventListener('click', handleInstallClick);
    closeButton.removeEventListener('click', closeInstallHelp);
    installDialog.removeEventListener('click', handleDialogClick);
  };
}
