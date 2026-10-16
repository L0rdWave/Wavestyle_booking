export function renderHelios() {
  return `
    <div class="project-container helios-theme">
      <div class="back-nav">
        <a href="#/" data-link class="back-link"><i data-lucide="arrow-left"></i> Volver a la Placa Madre</a>
      </div>

      <header class="project-header">
        <div class="project-logo-wrapper">
          <img src="/images/logo-helios-wave.png" alt="Helios Wave Logo" class="brand-node-logo" />
        </div>
        <span class="project-genre"><i data-lucide="disc"></i> PSYTRANCE · FULL ON · TWILIGHT · DARKPSY</span>
        <h1>Helios Wave</h1>
        <p class="project-subtitle">La faceta con mayor recorrido en cabinas, raves y festivales.</p>
      </header>

      <section class="project-content">
        <div class="info-block">
          <h2><i data-lucide="radio"></i> El Viaje Sonoro</h2>
          <p>
            Helios Wave representa la energía expansiva del trance psicodélico. Con trayectoria en pistas de CABA 
            y diversas provincias, este proyecto ha compartido cabina con destacados referentes internacionales, 
            llevando la intensidad del Full On y el Twilight a festivales, clubes y gatherings underground.
          </p>
        </div>

        <!-- REPRODUCTOR DE AUDIO PROTEGIDO (HELIOS WAVE) -->
        <div class="audio-player-card helios-player-card" oncontextmenu="return false;">
          <div class="track-info">
            <div class="track-icon helios-track-icon">
              <i data-lucide="music"></i>
            </div>
            <div class="track-details">
              <h3>Twilightronix</h3>
              <p>Helios Wave &mdash; Studio Preview (128 kbps)</p>
            </div>
            <span class="badge-preview helios-badge">PREVIEW</span>
          </div>

          <div class="player-wrapper">
            <audio controls controlsList="nodownload noplaybackrate" class="cyber-audio-element">
              <source src="/audio/helios-wave-twilightronix.mp3" type="audio/mpeg">
              Tu navegador no soporta el reproductor de audio.
            </audio>
          </div>
        </div>

        <div class="milestone-box" style="margin-top: 2rem;">
          <h3><i data-lucide="award"></i> Hito Histórico: DJ Contest Javier Bussola & Niceto Club</h3>
          <p>
            Ganador del DJ Contest organizado por Javier Bussola, con presentaciones en escenarios icónicos como Niceto Club. 
            A continuación, uno de los registros sonoros de aquella época:
          </p>
          
          <div class="soundcloud-embed-container">
            <iframe 
              width="100%" 
              height="166" 
              scrolling="no" 
              frameborder="no" 
              allow="autoplay" 
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/helios-wave/set-navideno-helios-wave-niceto-club&color=%237209b7&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false">
            </iframe>
          </div>
        </div>

        <!-- CABINAS & ARTISTAS COMPARTIDOS -->
        <div class="info-block" style="margin-top: 2.5rem;">
          <h2><i data-lucide="map-pin"></i> Cabinas, Festivales & Referentes</h2>
          <p><strong>Artistas compartidos en lineup:</strong> Astral Projection, Javier Bussola, Moksha, Ital, Telepatic.</p>
          <p style="margin-top: 0.5rem;"><strong>Gatherings & Eventos:</strong> Niceto Club, Earthdance, Guerreros del Arco Iris, Erks, Moon Flower, Bahrein, Vox.</p>
        </div>

        <!-- ACCESO A BOOKING -->
        <div class="booking-cta-box" style="margin-top: 2.5rem; text-align: center; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">
          <h3>¿Querés contratar a Helios Wave para tu festival o fecha?</h3>
          <a href="#/booking" data-link class="counter" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            <i data-lucide="calendar"></i> Ver Rider Técnico & Booking Directo &rarr;
          </a>
        </div>
      </section>
    </div>
  `;
}