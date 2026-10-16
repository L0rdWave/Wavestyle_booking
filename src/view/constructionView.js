export function renderConstruction(moduleName) {
  return `
    <div class="construction-container">
      <div class="terminal-box">
        <span class="prompt">> sys.load_module("${moduleName}")</span>
        <h2>[ MÓDULO EN DESARROLLO ]</h2>
        <p>Los circuitos de esta sección se están ensamblando en el laboratorio.</p>
        <a href="#/" data-link class="back-btn">&larr; Volver a la Placa Madre</a>
      </div>
    </div>
  `;
}