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
      menuAbout: "Über",
      menuPossibilities: "Kulturdaten",
      menuPlaybook: "Playbook",
      menuEvents: "Events",
      eventsH2: "Events",
      eventAbschlusskonferenz: "Abschlusskonferenz",
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
      contactLabel: "Kontakt:",
      impressumH2: "Impressum",
      impressumProviderH3: "Anbieter",
      impressumAddress:
        "Deutsche Nationalbibliothek<br>Bundesunmittelbare Anstalt des Öffentlichen Rechts<br>Adickesallee 1<br>60322 Frankfurt am Main<br>Deutschland",
      impressumVat: "USt-ID Nr.: DE152407811",
      impressumPrivacy: "Datenschutzerklärung",
      possibilitiesH2: "Was mit Kulturdaten möglich ist",
      possibilitiesP1: "… zeigen die vielen digitalen Kulturanwendungen, die von den rund 2.000 Teilnehmer*innen auf Basis hunderter Datensets aus Museen, Archiven, Bibliotheken, Gedenkstätten und anderer Kulturinstitutionen entwickelt wurden.",
      figuresInstitutions: "Institutionen",
      figuresDatasets: "Datensets",
      figuresProjects: "Projekte",
      faq1H2: "Welche Chancen bietet das digitale Zeitalter f\u00fcr Kulturinstitutionen?",
      faq1Body: "<p>Welche kreativen Energien werden freigesetzt, wenn digitale Kulturdaten offen zug\u00e4nglich und frei nutzbar sind? Die digitale Verf\u00fcgbarkeit von Kulturg\u00fctern ver\u00e4ndert die Beziehung zwischen Kultureinrichtungen und Kulturinteressierten.</p><p>Leider wird dieses Potenzial h\u00e4ufig verkannt. Doch in unserer vernetzten Welt wird es f\u00fcr Archive, Museen, Bibliotheken u.a. zunehmend wichtiger, mit digitalen Besucher*innen zu interagieren.</p><p>Immer mehr Kulturinstitutionen digitalisieren ihre Sammlungen. Dadurch wachsen die Chancen, jene Sammlungen einer breiten \u00d6ffentlichkeit zug\u00e4nglich zu machen. Gleichzeitig gibt es Bedenken, das digitalisierte Kulturerbe k\u00f6nne durch eine umfassende \u00d6ffnung in irref\u00fchrende Kontexte gesetzt oder durch kommerzielle Nachnutzung entwertet werden. Manche bef\u00fcrchten den Verlust ihrer Deutungshoheit. Diese Bedenken wollte Coding da Vinci zerstreuen und dazu anregen, die mit der Digitalisierung einhergehenden Perspektiven und Fragen aktiv zu entdecken!</p>",
      faq2H2: "Welche Ziele verfolgte Coding da Vinci?",
      faq2Body: "<p>Das Projektarchiv von Coding da Vinci (zug\u00e4nglich \u00fcber die <a href=\"https://web.archive.org/web/20260101000000*/codingdavinci.de\" target=\"_blank\" rel=\"noopener\">archivierte Version</a> dieser Seite) ist eine Inspirationsquelle f\u00fcr Kuratoren und Mitarbeitende digitaler Datensammlungen: Hier k\u00f6nnen sie die Potenziale frei zug\u00e4nglicher und nutzbarer Kulturdaten erkennen und erleben.</p><p>Mit seiner ersten regionalen Ausgabe wurde Coding da Vinci 2016 von einem bundesweiten Event zu einem dezentralen Projekt mit regionaler Ausrichtung. Es gab die Kultur-Hackathons in Hamburg, Berlin-Brandenburg, in Leipzig, im Rhein-Main-Gebiet, in S\u00fcddeutschland, in der Region Westfalen-Ruhrgebiet, in der Gro\u00dfregion Saar-Lor-Lux (erstmals vollst\u00e4ndig grenz\u00fcbergreifend), in Niedersachsen, Schleswig-Holstein, in der Region Rheinland/Niederrhein, in Baden-W\u00fcrttemberg und (ebenfalls l\u00e4nder\u00fcbergreifend) in Sachsen, Polen und der Tschechischen Republik.</p><p>Die langfristige Vision von Coding da Vinci war die Schaffung dauerhafter Strukturen, in denen Kulturinstitutionen und interessierte Teile der Zivilgesellschaft auf Basis offener Daten zusammenarbeiten. Wir wollten einen strukturellen Wandel in den Kulturerbeinstitutionen bef\u00f6rdern, offene Daten als Thema f\u00fcr die Politik entwickeln und die Zug\u00e4nglichkeit digitalen Kulturerbes in der Gesellschaft bekannt machen.</p>"
    },
    en: {
      title: "Coding da Vinci – Homepage",
      skipLink: "Skip to main content",
      menuAbout: "About",
      menuPossibilities: "Cultural data",
      menuPlaybook: "Playbook",
      menuEvents: "Events",
      eventsH2: "Events",
      eventAbschlusskonferenz: "Final Conference",
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
      contactLabel: "Contact:",
      impressumH2: "Imprint",
      impressumProviderH3: "Provider",
      impressumAddress:
        "German National Library<br>Federal institution under public law<br>Adickesallee 1<br>60322 Frankfurt am Main<br>Germany",
      impressumVat: "VAT ID No.: DE152407811",
      impressumPrivacy: "Privacy policy",
      possibilitiesH2: "The potential of open cultural data",
      possibilitiesP1: "… is shown by the creative digital projects made by, to date, over 2000 hackathon participants, on the basis of hundreds of datasets contributed by almost 200 cultural institutions.",
      figuresInstitutions: "Institutions",
      figuresDatasets: "Data sets",
      figuresProjects: "Projects",
      faq1H2: "Which opportunities does the digital era offer to cultural institutions?",
      faq1Body: "<p>What is the creative energy unleashed by making digital cultural data openly accessible and freely usable? Digital availability of cultural goods changes the relationship between cultural institutions and individuals interested in culture.</p><p>Unfortunately, this potential is often overlooked. However, in our increasingly digital world, online interaction with visitors is key for archives, museums, libraries and other cultural institutions.</p><p>More and more cultural institutions are digitalising their collections, opening up the possibility to grant access to these collections to a wider public. At the same time there are many concerns that opening up digital cultural heritage could somehow devalue it if it were to be used out of context or re-used for commercial purposes. Some institutions even fear that their status as an authority may be undermined. Coding da Vinci wants to alleviate these concerns. It is about time that we actively explore the perspectives and questions that digitisation brings up!</p>",
      faq2H2: "What goals does Coding da Vinci pursue?",
      faq2Body: "<p>Coding da Vinci\u2019s project archive (accessible via the <a href=\"https://web.archive.org/web/20260101000000*/codingdavinci.de\" target=\"_blank\" rel=\"noopener\">archived version</a> of this site) is a growing inspiration to curators and managers of digital collections. There, they can find and experience the potential inherent to openly accessible and re-usable cultural data.</p><p>With its first regional edition in 2016 Coding da Vinci turned from a Germany-wide to a decentralized event with regional focus. Since then, hackathons have been held in Hamburg, Berlin-Brandenburg, Leipzig, in the Rhein-Main region, in southern Germany, in the region of Westfalia and Ruhr, in Hannover and even crossing borders in the greater region of Saarland, Luxemburg and the Lorraine.</p><p>The long term vision of Coding da Vinci is to install lasting structures that allow cultural institutions to work with interested members of civil society on the basis of open data. We want to bring about structural change in cultural heritage institutions, put open data as a subject on the political agenda and popularise the accessibility of cultural heritage in all parts of society.</p>"
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
