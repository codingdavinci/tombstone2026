(function () {
  "use strict";

  /**
   * Minimal i18n for the static frontpage using FormatJS (IntlMessageFormat).
   * - Detects language via ?lang=de|en, then localStorage, then browser.
   * - Translates elements with [data-i18n] (textContent) and [data-i18n-html] (innerHTML).
   * - Updates <html lang>, document.title, and the theme language switcher active state.
   */

  var STORAGE_KEY = "cdv_lang";

  // ICU message catalogs (FormatJS).
  var messages = {
    de: {
      title: "Coding da Vinci – Startseite",
      skipLink: "Zum Inhalt springen",
      headerIntro:
        "Der erste deutsche Hackathon für offene Kulturdaten. Hier entfalteten von 2014 bis 2022 innovative Anwendungen das kreative Potenzial in unserem digitalen Kulturerbe.",
      aboutH2: "Was war Coding da Vinci?",
      aboutP1:
        "Von 2014 bis 2022 vernetzte Coding da Vinci, der Kulturhackathon, Kultur- und Technikwelten miteinander und zeigte, welche überraschenden Möglichkeiten in offenen Kulturdaten stecken. In mehrwöchigen Sprintphasen entwickelten Teams aus Hacker*innen gemeinsam mit Kulturinstitutionen funktionierende Prototypen z.B. für Apps, Webseiten, Datenvisualisierungen, Spiele oder interaktive Installationen, die überraschende und inspirierende Wege zeigen, wie Sammlungsobjekte von Institutionen auf neue Weisen vermittelt und genutzt werden können.",
      playbookH2: "Das Coding da Vinci-Playbook",
      playbookH3: "Schritt für Schritt zum eigenen Kultur-Hackathon",
      playbookP1:
        "<p>Coding da Vinci ist zu einer Bewegung für offene Kulturdaten geworden: Werde jetzt ein Teil davon!</p><p>Mit dem Coding da Vinci-Playbook kannst du eigene Kultur-Hackathons durchführen. Es funktioniert wie ein Kochbuch: Probiere das ganze Menü, einzelne Gänge oder nur bestimmte Zutaten aus – ganz nach deinem Geschmack. Dabei profitierst du von langjähriger Erfahrung aus insgesamt 14 Coding da Vinci-Ausgaben, mit der du Schritt für Schritt durch die Organisation des gesamten Prozesses geführt wirst – von der Bereitstellung der Daten über den kreativen „magic moment“ des Kick-Offs bis zur Präsentation der Ergebnisse.</p><p>Das Playbook steht unter einer <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.de\" target=\"_blank\" rel=\"noopener\">Creative Commons BY-SA 4.0 Lizenz</a> und kann frei genutzt, weitergegeben und angepasst werden.</p>",
      playbookA: "Jetzt kostenlos downloaden!",
      footerP1:
        "Coding da Vinci – Der Kultur-Hackathon wurde zwischen 2019 und 2022 von der <strong>Kulturstiftung des Bundes</strong> gefördert als gemeinsames&nbsp;Projekt der <strong>Deutschen Digitalen Bibliothek</strong>, dem <strong>Forschungs- und Kompetenzzentrum Digitalisierung Berlin (digiS)</strong>, der <strong>Open Knowledge Foundation Deutschland</strong> und <strong>Wikimedia Deutschland</strong>.",
      fundedBy: "Gefördert durch:",
      contactLabel: "Kontakt:"
    },
    en: {
      title: "Coding da Vinci – Homepage",
      skipLink: "Skip to main content",
      headerIntro:
        "Coding da Vinci, the first German hackathon for open cultural data, is a platform for innovative projects that release the creative potential of our digital cultural heritage.",
      aboutH2: "What was Coding da Vinci?",
      aboutP1:
        "Since its inception in 2014, the culture hackathon Coding da Vinci has brought together the cultural sector with creative technology communities to explore the creative potential of digital cultural heritage. Over a several-week sprint phase hackathon teams, together with representatives of cultural institutions, develop working prototypes --for example apps, websites, data visualisations, games or interactive installations-- that show surprising and inspiring new ways to communicate and make use of institutions' collections and artifacts in the digital age.",
      playbookH2: "The Coding da Vinci playbook",
      playbookH3: "Step by step to your own culture hackathon",
      playbookP1:
        "<p>Coding da Vinci has become a movement for open cultural data: Become a part of it now!</p><p>With the Coding da Vinci Playbook, you can run your own culture hackathons. It works like a cookbook: try out the whole menu, individual courses, or just certain ingredients - according to your taste. Benefit from many years of experience from a total of 14 Coding da Vinci editions, which guides you step by step through the organization of the entire process - from the provision of data to the creative \"magic moment\" of the kick-off to the presentation of the results.!</p><p>The playbook is licensed under a <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.de\" target=\"_blank\" rel=\"noopener\">Creative Commons BY-SA 4.0 license</a> and may be freely used, shared, and adapted.</p>",
      playbookA: "Download now for free!",
      footerP1:
        "Coding da Vinci – the Culture Hackathon is supported by the <strong>Kulturstiftung des Bundes</strong> as a joint project of the <strong>Deutschen Digitale Bibliothek</strong>, <strong>Forschungs- und Kompetenzzentrum Digitalisierung Berlin (digiS)</strong>, <strong>Open Knowledge Foundation Deutschland</strong> and <strong>Wikimedia Deutschland</strong>.",
      fundedBy: "Funded by:",
      contactLabel: "Contact:"
    }
  };

  function getIntlMessageFormatCtor() {
    var g = typeof globalThis !== "undefined" ? globalThis : window;
    var imf = g && g.IntlMessageFormat;

    // Common cases:
    // - UMD assigns the constructor directly: window.IntlMessageFormat
    // - UMD assigns an object with a constructor property
    // - Some bundlers expose default export
    if (typeof imf === "function") return imf;
    if (imf && typeof imf.IntlMessageFormat === "function") return imf.IntlMessageFormat;
    if (imf && typeof imf.default === "function") return imf.default;

    return null;
  }

  function hasFormatJs() {
    return !!getIntlMessageFormatCtor();
  }

  function formatMessage(locale, key, values) {
    var table = messages[locale] || messages.en;
    var msg = table[key];
    if (msg == null) return null;

    // Use FormatJS when available; otherwise fall back to raw string.
    if (!hasFormatJs()) return String(msg);

    try {
      var IntlMessageFormatCtor = getIntlMessageFormatCtor();
      if (!IntlMessageFormatCtor) return String(msg);

      var formatter = new IntlMessageFormatCtor(String(msg), locale);
      return formatter.format(values || {});
    } catch (e) {
      return String(msg);
    }
  }

  function normalizeLang(lang) {
    if (!lang) return null;
    lang = String(lang).toLowerCase();
    if (lang.startsWith("de")) return "de";
    if (lang.startsWith("en")) return "en";
    return null;
  }

  function getLangFromUrl() {
    try {
      var params = new URLSearchParams(window.location.search);
      return normalizeLang(params.get("lang"));
    } catch (e) {
      return null;
    }
  }

  function getLangFromStorage() {
    try {
      return normalizeLang(window.localStorage.getItem(STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  function getLangFromBrowser() {
    return normalizeLang(navigator.language || navigator.userLanguage);
  }

  function setUrlLang(lang) {
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState({}, "", url.toString());
    } catch (e) {
      // Ignore (e.g. older browsers / file:// edge cases)
    }
  }

  function persistLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
  }

  function applyTranslations(lang) {
    document.documentElement.setAttribute("lang", lang);

    var title = formatMessage(lang, "title");
    if (title != null) document.title = title;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;

      var text = formatMessage(lang, key);
      if (text != null) {
        el.textContent = text;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!key) return;

      var html = formatMessage(lang, key);
      if (html != null) {
        el.innerHTML = html;
      }
    });

    document
      .querySelectorAll('.language-switcher-language-url a[data-lang]')
      .forEach(function (a) {
        var aLang = a.getAttribute("data-lang");
        var li = a.closest && a.closest("li");

        if (aLang === lang) {
          a.setAttribute("aria-current", "page");
          if (li) li.classList.add("is-active");
        } else {
          a.removeAttribute("aria-current");
          if (li) li.classList.remove("is-active");
        }
      });

    // Allow rendering once the correct language is applied.
    document.documentElement.classList.remove("i18n-pending");
  }

  function setLang(lang, options) {
    options = options || {};
    lang = normalizeLang(lang) || "en";

    applyTranslations(lang);

    if (options.persist !== false) persistLang(lang);
    if (options.updateUrl !== false) setUrlLang(lang);
  }

  document.addEventListener("click", function (e) {
    var target = e.target;
    if (!target) return;

    var link =
      target.closest &&
      target.closest(".language-switcher-language-url a[data-lang]");
    if (!link) return;

    e.preventDefault();
    setLang(link.getAttribute("data-lang"));
  });

  var initial = getLangFromUrl() || getLangFromStorage() || getLangFromBrowser() || "en";
  setLang(initial, { updateUrl: getLangFromUrl() != null });
})();
