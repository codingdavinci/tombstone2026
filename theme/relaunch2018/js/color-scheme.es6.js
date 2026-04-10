/**
 * @file
 * Color scheme specific functionality.
 */
(function($) {
  $(() => {
    $('[data-color-scheme-hover]').hover(
      e => changeColor(e, true),
      e => changeColor(e, false)
    );
  });

  /**
   * @param {jQuery.Event} event
   * @param {boolean} mouseOver
   */
  function changeColor(event, mouseOver) {
    const $container = $(event.target).closest('[data-color-scheme-hover]');
    const color = getColor($container, mouseOver);

    if (color) {
      $container.stop(true).animate(
        {
          backgroundColor: `#${color}`
        },
        {
          duration: 'fast'
        }
      );
    }
  }

  /**
   * Retrieves a color from the color scheme saved on the container node per
   * data attribute.
   *
   * @param {jQuery} $container
   * @param {boolean} mouseOver
   * @return {string|null}
   */
  function getColor($container, mouseOver) {
    const colorScheme = $container.data('color-scheme-hover');
    const normalizedScheme = normalizeScheme(colorScheme, $container);

    if (!normalizedScheme) {
      return null;
    }

    $container.data('color-scheme-hover', normalizedScheme);
    return normalizedScheme[mouseOver ? 1 : 0];
  }

  /**
   * @param {string|Array} colorScheme
   * @param {jQuery} $container
   * @return {Array|null}
   */
  function normalizeScheme(colorScheme, $container) {
    if ($.isArray(colorScheme) && colorScheme.length === 2) {
      const base = normalizeColor(colorScheme[0]);
      const hover = normalizeColor(colorScheme[1]);

      if (!base && !hover) {
        return null;
      }

      return [base || hover, hover || base];
    }

    if (typeof colorScheme === 'string') {
      const base = normalizeColor($container.css('background-color'));
      let hover = normalizeColor(colorScheme);

      if (!hover) {
        return null;
      }

      if (base && base === hover) {
        hover = adjustHex(hover, -0.12);
      }

      return [base || hover, hover];
    }

    return null;
  }

  /**
   * @param {string} value
   * @return {string|null}
   */
  function normalizeColor(value) {
    if (!value) {
      return null;
    }

    const raw = String(value).trim();

    if (raw[0] === '#') {
      return normalizeColor(raw.slice(1));
    }

    if (/^rgba?\(/i.test(raw)) {
      return rgbToHex(raw);
    }

    if (/^[0-9a-f]{3}$/i.test(raw)) {
      return raw.split('').map((c) => `${c}${c}`).join('').toUpperCase();
    }

    if (/^[0-9a-f]{6}$/i.test(raw)) {
      return raw.toUpperCase();
    }

    if (/^[0-9a-f]{5}$/i.test(raw)) {
      return (`0${raw}`).toUpperCase();
    }

    return null;
  }

  /**
   * @param {string} rgb
   * @return {string|null}
   */
  function rgbToHex(rgb) {
    const match = rgb.match(/rgba?\(([^)]+)\)/i);
    if (!match) {
      return null;
    }

    const parts = match[1].split(',').map((part) => parseFloat(part));
    if (parts.length < 3) {
      return null;
    }

    return toHex(parts[0]) + toHex(parts[1]) + toHex(parts[2]);
  }

  /**
   * @param {number} value
   * @return {string}
   */
  function toHex(value) {
    const clamped = Math.max(0, Math.min(255, Math.round(value)));
    const hex = clamped.toString(16).toUpperCase();
    return hex.length === 1 ? `0${hex}` : hex;
  }

  /**
   * @param {string} hex
   * @param {number} amount
   * @return {string}
   */
  function adjustHex(hex, amount) {
    const normalized = normalizeColor(hex);
    if (!normalized) {
      return hex;
    }

    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    const delta = Math.round(255 * amount);

    return toHex(r + delta) + toHex(g + delta) + toHex(b + delta);
  }
})(jQuery);
