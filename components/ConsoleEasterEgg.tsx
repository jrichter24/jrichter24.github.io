'use client';

import { useEffect } from 'react';

// For whoever opens DevTools. Logged once, quietly.
export default function ConsoleEasterEgg() {
  useEffect(() => {
    const banner = [
      '',
      '       _ ____',
      '      | |  _ \\    Dr. Jens Richter',
      '   _  | | |_) |   A Physicist in Mind, Developer by Heart, Engineer by Passion.',
      '  | |_| |  _ <',
      '   \\___/|_| \\_\\   200 OK',
      '',
    ].join('\n');

    console.log('%c' + banner, 'font-family:monospace;font-size:12px;line-height:1.2;');
    console.log(
      '%c// you opened DevTools. respect. → github.com/jrichter24',
      'font-family:monospace;color:#1d2eff;',
    );
  }, []);

  return null;
}
