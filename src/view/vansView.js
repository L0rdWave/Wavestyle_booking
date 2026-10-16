export function renderVans() {
  return `
    <div class="project-container vans-theme">
      <div class="back-nav">
        <a href="#/" data-link class="back-link">
          <i data-lucide="arrow-left"></i> Volver a la Placa Madre
        </a>
      </div>

      <header class="project-header">
        <div class="project-logo-wrapper">
          <img src="/images/logo-vans.png" alt="Vans Logo" class="brand-node-logo" />
        </div>
        <span class="project-genre"><i data-lucide="disc"></i> HOUSE · GROOVE · FUNKY · DEEP</span>
        <h1>Vans</h1>
        <p class="project-subtitle">Una identidad centrada en el groove, la calidez del house y la conexión orgánica con la pista de baile.</p>
      </header>

      <section class="project-content">
        <div class="info-block">
          <h2><i data-lucide="radio"></i> Producciones del Estudio</h2>
          <p>
            Muestra sonora y cortes de prueba producidos en el laboratorio. Versiones optimizadas en calidad streaming para la web.
          </p>
        </div>

        <!-- REPRODUCTOR DE AUDIO PROTEGIDO -->
        <div class="audio-player-card" oncontextmenu="return false;">
          <div class="track-info">
            <div class="track-icon">
              <i data-lucide="music"></i>
            </div>
            <div class="track-details">
              <h3>Take You Higher (lowless)</h3>
              <p>Vans &mdash; Studio Preview (128 kbps)</p>
            </div>
            <span class="badge-preview">PREVIEW</span>
          </div>

          <div class="player-wrapper">
            <audio controls controlsList="nodownload noplaybackrate" class="cyber-audio-element">
              <source src="/audio/vans-take-you-higher.mp3" type="audio/mpeg">
              Tu navegador no soporta el reproductor de audio.
            </audio>
          </div>
        </div>

        <!-- CABINAS & ARTISTAS COMPARTIDOS -->
        <div class="info-block" style="margin-top: 2.5rem;">
          <h2><i data-lucide="users"></i> Cabinas & Lineups Compartidos</h2>
          <p><strong>DJs & Artistas con los que compartió fecha:</strong> Martín Angrisano, Gabriel Menza, César Suárez, JP Sgalia, Chino Carabajal, Camila Díaz, Kasem, Jonny Vidal, Rorro, Rio, Tramonttana, Leo Lib, Groovero, Hynox, Hernán Paredes, Mariano Novo.</p>
          <p style="margin-top: 0.8rem;"><strong>Clubes & Eventos:</strong> Caix, Pinar de Rocha, Bloody, Bahrein, Vox, El Dorado.</p>
        </div>

        <!-- ACCESO A BOOKING -->
        <div class="booking-cta-box" style="margin-top: 2.5rem; text-align: center; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">
          <h3>¿Querés contratar a Vans para un club o evento?</h3>
          <a href="#/booking" data-link class="counter" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            <i data-lucide="calendar"></i> Ver Rider Técnico & Booking Directo &rarr;
          </a>
        </div>
      </section>
    </div>
  `;
}