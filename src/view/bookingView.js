export function renderBooking() {
  return `
    <div class="project-container booking-theme">
      <div class="back-nav">
        <a href="#/" data-link class="back-link"><i data-lucide="arrow-left"></i> Volver a la Placa Madre</a>
      </div>

      <header class="project-header">
        <div class="project-logo-wrapper">
          <div class="project-logo-placeholder">BOOKING</div>
        </div>
        <span class="project-genre"><i data-lucide="calendar"></i> CONTRATACIONES · EVENTOS · FECHAS</span>
        <h1>Booking & Contacto</h1>
        <p class="project-subtitle">Canales directos para fechas, logística, rider técnico y recursos de prensa.</p>
      </header>

      <section class="project-content">
        <!-- CANALES DE CONTACTO -->
        <div class="info-block">
          <h2><i data-lucide="radio"></i> Canales Oficiales Directos</h2>
          <p>
            Cada identidad de Wavestyle opera en sintonía con su propio circuito. Para propuestas de fechas, 
            coordinación de sets en vivo o consultas, comunícate a través de los canales directos:
          </p>
        </div>

        <div class="contact-links-grid">
          <a href="https://instagram.com/wavestyle.ok" target="_blank" rel="noreferrer" class="contact-card">
            <h3><i data-lucide="instagram"></i> Instagram</h3>
            <p>@wavestyle.ok (Mensajes directos)</p>
          </a>
          <a href="https://t.me/L0rdWave" target="_blank" rel="noreferrer" class="contact-card">
            <h3><i data-lucide="send"></i> Telegram Directo</h3>
            <p>@L0rdWave (Contacto directo)</p>
          </a>
          <a href="https://t.me/wavestyle_novedades" target="_blank" rel="noreferrer" class="contact-card">
            <h3><i data-lucide="radio"></i> Canal de Telegram</h3>
            <p>t.me/wavestyle_novedades</p>
          </a>
        </div>

        <!-- BOTÓN DE DESCARGA DIRECTA PRESS KIT (LOGOS Y FOTOS) -->
        <div class="milestone-box" style="margin-top: 2.5rem; border-left-color: #00f0ff; background: rgba(0, 240, 255, 0.05);">
          <h3><i data-lucide="download"></i> Material para Flyers & Prensa (Press Pack)</h3>
          <p>
            Descarga directa del paquete oficial para diseñadores, productores y encargados de prensa. Incluye logos transparentes en alta resolución y fotografías oficiales para prensa/flyers.
          </p>
          
          <div style="margin-top: 1.2rem;">
            <a href="/downloads/wavestyle-presskit.zip" download class="counter" style="display: inline-flex; align-items: center; gap: 0.6rem; text-decoration: none; padding: 0.8rem 1.4rem;">
              <i data-lucide="file-archive"></i> Descargar Press Kit Oficial (.ZIP)
            </a>
          </div>
        </div>

        <!-- DISPONIBILIDAD & LOGÍSTICA -->
        <div class="info-block" style="margin-top: 2.5rem;">
          <h2><i data-lucide="map-pin"></i> Disponibilidad & Logística</h2>
          <p>
            Disponible para fechas en Buenos Aires, interior del país e internacionales. 
            <em>(Fechas fuera de CABA a coordinar con 30 días de anticipación por agenda laboral).</em>
          </p>
        </div>

        <!-- FORMATOS DE SET & PERFORMANCE -->
        <div class="info-block" style="margin-top: 2rem;">
          <h2><i data-lucide="sliders"></i> Formatos de Set & Performance</h2>
          <ul class="booking-specs-list" style="list-style: none; padding-left: 0; line-height: 1.8;">
            <li><strong><i data-lucide="clock"></i> Duración:</strong> Desde sets contundentes de 1h / 1h30m hasta <em>All Night Long / OTC (Open to Close)</em> previa coordinación.</li>
            <li><strong><i data-lucide="users"></i> B2B:</strong> Disponible bajo consulta puntual.</li>
            <li><strong><i data-lucide="zap"></i> Slot Ideal:</strong> Mid-Set / Peak Time / Closing (Energía alta y progresión orientada a la pista).</li>
          </ul>
        </div>

        <!-- RIDER TÉCNICO OFICIAL -->
        <div class="milestone-box" style="margin-top: 2.5rem; border-left-color: #00f0ff;">
          <h3><i data-lucide="cpu"></i> Rider Técnico Oficial</h3>
          <ul class="rider-list" style="list-style: none; padding-left: 0; line-height: 1.8;">
            <li><strong>Setup Ideal:</strong> 3x Pioneer CDJ-2000NXS2 / 3000 + Mixer Pioneer DJM-900NXS2 + RMX-1000.</li>
            <li><strong>Setup Alternativo (Mínimo requerido):</strong> Controladoras Pioneer profesionales de 2 o 4 canales (All-in-One series XDJ / DDJ profesionales).</li>
            <li><strong>Monitoreo:</strong> 2x Monitores de piso/cabina de alta potencia con control de volumen independiente en cabina.</li>
          </ul>
        </div>
      </section>
    </div>
  `;
}