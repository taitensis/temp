type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  // Works in Astro/Vite. Fallback to NODE_ENV for Node.js environments
  private isDev =
    typeof import.meta.env !== 'undefined'
      ? import.meta.env.DEV
      : process.env.NODE_ENV !== 'production';

  private log(level: LogLevel, message: string, data?: unknown) {
    if (!this.isDev && level === 'debug') return;

    const timestamp = new Date().toISOString();
    const output = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

    switch (level) {
      case 'debug':
      case 'info':
        console.warn(output, data ?? '');
        break;
      case 'warn':
        console.warn(output, data ?? '');
        break;
      case 'error':
        console.error(output, data ?? '');
        break;
    }
  }

  debug(message: string, data?: unknown) {
    this.log('debug', message, data);
  }

  info(message: string, data?: unknown) {
    this.log('info', message, data);
  }

  warn(message: string, data?: unknown) {
    this.log('warn', message, data);
  }

  error(message: string, data?: unknown) {
    this.log('error', message, data);
  }
}

export const logger = new Logger();
