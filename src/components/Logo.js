export function renderLogo() {
  return `
    <div class="wavestyle-brand-logo">
      <svg class="w-symbol" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
        <path d="M 10,25 C 20,5 30,55 45,55 C 60,55 65,15 80,15 C 95,15 100,45 110,25" 
              fill="none" stroke="url(#wave-grad)" stroke-width="5" stroke-linecap="round"/>
        <defs>
          <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#00f2fe"/>
            <stop offset="100%" stop-color="#7928ca"/>
          </linearGradient>
        </defs>
      </svg>
      <span class="logo-text">W<span>Ʌ</span>VESTYLE</span>
    </div>
  `;
}