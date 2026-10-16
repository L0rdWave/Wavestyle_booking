import { createHash } from 'node:crypto';

if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== 'function') {
  console.error('Ejecutá este comando en una terminal interactiva para ocultar el token al ingresarlo.');
  process.exitCode = 1;
} else {
  process.stdout.write('Pegá el token (no se mostrará) y presioná Enter: ');
  process.stdin.setRawMode(true);
  process.stdin.resume();

  let token = '';
  process.stdin.on('data', chunk => {
    for (const character of chunk.toString('utf8')) {
      if (character === '\u0003') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\nCancelado.\n');
        process.exitCode = 1;
        return;
      }
      if (character === '\r' || character === '\n') {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\n');
        if (token.length < 24) {
          console.error('El token debe tener al menos 24 caracteres.');
          process.exitCode = 1;
          return;
        }
        console.log(createHash('sha256').update(token, 'utf8').digest('hex'));
        token = '';
        return;
      }
      if (character === '\u007f' || character === '\b') {
        token = token.slice(0, -1);
      } else if (character >= ' ') {
        token += character;
      }
    }
  });
}
