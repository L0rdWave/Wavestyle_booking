import manifest from '../data/core-manifest.json';
import { renderLogo } from '../components/Logo.js';

export function renderHome() {
  const { brand, creator, handle, tagline, concept, bio, identities, vault, futureModules } = manifest.artist;

  return `
    <div class="motherboard-container">
      
      <div class="hero-banner-wrapper">
        <img src="/images/banner-hero.jpg" alt="Vans tocando en vivo para Wavestyle" class="hero-bg-img" onerror="this.style.display='none'" />
        <div class="hero-overlay"></div>
      </div>

      <header class="hub-header">
        <h1>${brand}</h1>
        <p class="tagline">${tagline}</p>
        <p class="concept-phrase">"${concept}"</p>
        
        <div class="header-metadata">
          <span class="arch-badge">
            <i data-lucide="cpu"></i> Arquitectura sonora: <strong>${creator}</strong>
          </span>
          <a href="https://instagram.com/wavestyle.ok" target="_blank" rel="noreferrer" class="social-link-discrete" title="Instagram oficial">
            <i data-lucide="instagram"></i> ${handle}
          </a>
        </div>
      </header>

      <section class="bio-section">
        <p>${bio}</p>
      </section>

      <main class="identities-grid">
        <h2>Identidades Musicales</h2>
        <div class="grid">
          ${identities.map(id => `
            <a href="#${id.path}" data-link class="identity-card card-${id.id}${id.status === 'upcoming' ? ' upcoming' : ''}">
              <div class="card-banner">
                <img src="${id.coverImage}" alt="" class="card-cover-image" />
                <span class="card-logo-backdrop" aria-hidden="true"></span>
                <img src="${id.logoImage}" alt="${id.title}" class="card-logo-image" />
                <span class="banner-overlay-title">${id.title}</span>
              </div>
              <div class="card-body">
                <span class="genre-tag">${id.genre}</span>
                <h3>${id.title}</h3>
                <p>${id.description}</p>
                <span class="action-link">
                  ${id.status === 'upcoming' ? 'Próximamente <i data-lucide="lock"></i>' : 'Acceder al Nodo <i data-lucide="arrow-right"></i>'}
                </span>
              </div>
            </a>
          `).join('')}
        </div>

        <div class="vault-panel">
          <h3><i data-lucide="archive"></i> ${vault.title}</h3>
          <p>${vault.description}</p>
        </div>

        <div class="expansion-section">
          <h2>Módulos del Sistema</h2>
          <div class="grid secondary">
            ${futureModules.map(mod => `
              <a href="#${mod.path}" data-link class="identity-card construction">
                <div class="card-body">
                  <h3>${mod.title}</h3>
                  <p>Módulo interactivo en preparación</p>
                  <span class="action-link">Inicializar <i data-lucide="chevron-right"></i></span>
                </div>
              </a>
            `).join('')}
          </div>
        </div>
      </main>

      <footer class="hub-footer">
        ${renderLogo()}
        <p>&copy; Wavestyle &mdash; Plataforma Sonora Independiente | Buenos Aires 🇦🇷 </p>
      </footer>
    </div>
  `;
}