export function renderSciKhole() {
  return `
    <div class="project-container scikhole-theme">
      <div class="back-nav">
        <a href="#/" data-link class="back-link"><i data-lucide="arrow-left"></i> Volver a la Placa Madre</a>
      </div>

      <header class="project-header">
        <div class="project-logo-wrapper">
          <img src="/images/logo-sci-khole.png" alt="Logo de Sci-Khole" class="brand-node-logo" />
        </div>
        <span class="project-genre"><i data-lucide="disc"></i> DETROIT · PEAK TIME · DRIVING · RAW · INDUSTRIAL · GROOVY · BOUNCY</span>
        <h1>Sci-Khole</h1>
        <p class="project-subtitle">Una exploración del techno de raíz Detroit, combinando sonidos driving, raw, industriales, groovy y bouncy.</p>
      </header>

      <section class="project-content">
        <div class="info-block">
          <h2>La Frecuencia de Pista</h2>
          <p>
            Sci-Khole sintetiza la esencia del Techno en su máxima expresión. Combinando la elegancia futurista del 
            <strong>Detroit Techno</strong> con el pulso frenético del <strong>Peak Time</strong> y <strong>Driving Techno</strong>, 
            el proyecto incorpora texturas <strong>Raw e Industrial</strong> sin perder nunca la cadencia <strong>Groovy y Bouncy</strong> que mantiene la pista en movimiento.
          </p>
        </div>

        <!-- CREDIBILIDAD UNDERGROUND -->
        <div class="info-block" style="margin-top: 2rem;">
          <h2><i data-lucide="cpu"></i> Cabina Privada & Ensayo de Laboratorio</h2>
          <p>
            Sesiones de alto calibre e intercambios en cabina compartida con <strong>Pandy</strong> (referente del techno nacional con amplia trayectoria), explorando sets industriales y driving de hasta 3 horas continuas.
          </p>
        </div>

        <div class="media-placeholder-box" style="margin-top: 2rem;">
          <h3>[ LABORATORIO EN PROCESO ]</h3>
          <p>Tracks de estudio listos para detonar en sets privates y fechas seleccionadas.</p>
        </div>

        <!-- ACCESO A BOOKING -->
        <div class="booking-cta-box" style="margin-top: 2.5rem; text-align: center; padding: 1.5rem; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">
          <h3>¿Querés coordinar una fecha o sesión con Sci-Khole?</h3>
          <a href="#/booking" data-link class="counter" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            <i data-lucide="calendar"></i> Ver Rider Técnico & Booking Directo &rarr;
          </a>
        </div>
      </section>
    </div>
  `;
}