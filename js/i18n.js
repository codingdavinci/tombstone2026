(function () {
  "use strict";

  /**
   * Minimal i18n for the static frontpage using FormatJS (IntlMessageFormat).
   * - Detects language via ?lang=de|en, then browser.
   * - Translates elements with [data-i18n] (textContent) and [data-i18n-html] (innerHTML).
   * - Updates <html lang>, document.title, and the theme language switcher active state.
   */

  // ICU message catalogs (FormatJS).
  var messages = {
    de: {
      title: "Coding da Vinci – Startseite",
      title404: "Coding da Vinci – 404",
      skipLink: "Zum Inhalt springen",
      menuAbout: "Über",
      menuPossibilities: "Kulturdaten",
      menuPlaybook: "Playbook",
      menuEvents: "Events",
      menuImpressum: "Impressum",
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
      faq2Body: "<p>Das Projektarchiv von Coding da Vinci (zug\u00e4nglich \u00fcber die <a href=\"https://web.archive.org/web/20260101000000*/codingdavinci.de\" target=\"_blank\" rel=\"noopener\">archivierte Version</a> dieser Seite) ist eine Inspirationsquelle f\u00fcr Kuratoren und Mitarbeitende digitaler Datensammlungen: Hier k\u00f6nnen sie die Potenziale frei zug\u00e4nglicher und nutzbarer Kulturdaten erkennen und erleben.</p><p>Mit seiner ersten regionalen Ausgabe wurde Coding da Vinci 2016 von einem bundesweiten Event zu einem dezentralen Projekt mit regionaler Ausrichtung. Es gab die Kultur-Hackathons in Hamburg, Berlin-Brandenburg, in Leipzig, im Rhein-Main-Gebiet, in S\u00fcddeutschland, in der Region Westfalen-Ruhrgebiet, in der Gro\u00dfregion Saar-Lor-Lux (erstmals vollst\u00e4ndig grenz\u00fcbergreifend), in Niedersachsen, Schleswig-Holstein, in der Region Rheinland/Niederrhein, in Baden-W\u00fcrttemberg und (ebenfalls l\u00e4nder\u00fcbergreifend) in Sachsen, Polen und der Tschechischen Republik.</p><p>Die langfristige Vision von Coding da Vinci war die Schaffung dauerhafter Strukturen, in denen Kulturinstitutionen und interessierte Teile der Zivilgesellschaft auf Basis offener Daten zusammenarbeiten. Wir wollten einen strukturellen Wandel in den Kulturerbeinstitutionen bef\u00f6rdern, offene Daten als Thema f\u00fcr die Politik entwickeln und die Zug\u00e4nglichkeit digitalen Kulturerbes in der Gesellschaft bekannt machen.</p>",
      cookieBannerAriaLabel: "Cookie-Einwilligung",
      cookieBannerMessage1: "Wir verwenden Cookies, um die Nutzung unserer Internetseite zu verbessern. Weitere Informationen <a href=\"https://www.dnb.de/DE/Service/Datenschutz/datenschutz_node.html\" target=\"_blank\" rel=\"noopener\">hier</a>.",
      cookieBannerMessage2: "Klicke „Akzeptieren“, um dich damit einverstanden zu erklären.",
      cookieBannerAccept: "Akzeptieren",
      cookieBannerDecline: "Nein, danke",
      videoConsentNoticeLink: "Video wird nach Zustimmung zu externen Inhalten geladen.",
      videoDirectYoutube: "Direkt auf YouTube ansehen",
      error404Heading: "404 - Seite nicht gefunden",
      error404Text: "<p>Ups! Diese Seite spielt gerade Verstecken.</p><p>Die offizielle Coding-da-Vinci-Webseite ist seit Juni 2026 offline \u2013 aber keine Sorge: Die Wayback Machine hat alles sicher archiviert. Du findest sie <a href=\"https://web.archive.org/web/20260101000000*/codingdavinci.de\" target=\"_blank\" rel=\"noopener\">hier im Webarchiv</a>.</p>",
      error404Home: "Zur Startseite"
    },
    en: {
      title: "Coding da Vinci – Homepage",
      title404: "Coding da Vinci – 404",
      skipLink: "Skip to main content",
      menuAbout: "About",
      menuPossibilities: "Cultural data",
      menuPlaybook: "Playbook",
      menuEvents: "Events",
      menuImpressum: "Imprint",
      eventsH2: "Events",
      eventAbschlusskonferenz: "Final Conference",
      headerIntro:
        "Coding da Vinci was the first German hackathon for open cultural data, active from 2014 to 2022. It unlocked the creative potential of our digital cultural heritage.",
      aboutH2: "What was Coding da Vinci?",
      aboutP1:
        "From 2014 to 2022, Coding da Vinci, the culture hackathon, brought together the cultural sector with creative technology communities to explore the creative potential of digital cultural heritage. During several-week sprint phases, hackathon teams worked together with representatives of cultural institutions to develop working prototypes—for example apps, websites, data visualisations, games or interactive installations—that demonstrated surprising and inspiring new ways to communicate and make use of institutions' collections and artifacts.",
      playbookH2: "The Coding da Vinci Playbook",
      playbookH3: "Step by step to your own culture hackathon",
      playbookP1:
        "<p>Coding da Vinci became a movement for open cultural data. You can become part of it!</p><p>With the Coding da Vinci Playbook, you can run your own culture hackathons. It works like a cookbook: try out the whole menu, individual courses, or just certain ingredients—according to your taste. Benefit from many years of experience from a total of 14 Coding da Vinci editions, which guides you step by step through the organization of the entire process—from the provision of data to the creative \"magic moment\" of the kick-off to the presentation of the results.</p><p>The playbook is licensed under a <a href=\"https://creativecommons.org/licenses/by-sa/4.0/deed.en\" target=\"_blank\" rel=\"noopener\">Creative Commons BY-SA 4.0 license</a> and may be freely used, shared, and adapted.</p>",
      playbookA: "Download now for free!",
      footerP1:
        "Coding da Vinci – the Culture Hackathon was supported between 2019 and 2022 by the <strong>Federal Cultural Foundation</strong> as a joint project of the <strong>German Digital Library</strong>, <strong>Research and Competence Center for Digitization Berlin (digiS)</strong>, <strong>Open Knowledge Foundation Germany</strong> and <strong>Wikimedia Germany</strong>.",
      fundedBy: "Funded by:",
      contactLabel: "Contact:",
      impressumH2: "Imprint",
      impressumProviderH3: "Provider",
      impressumAddress:
        "German National Library<br>Federal institution under public law<br>Adickesallee 1<br>60322 Frankfurt am Main<br>Germany",
      impressumVat: "VAT ID No.: DE152407811",
      impressumPrivacy: "Privacy policy",
      possibilitiesH2: "The creative potential of open cultural data",
      possibilitiesP1: "… is shown by the creative digital projects made by, to date, over 2000 hackathon participants, on the basis of hundreds of datasets contributed by museums, archives, libraries, memorial sites and other cultural institutions.",
      figuresInstitutions: "Institutions",
      figuresDatasets: "Data sets",
      figuresProjects: "Projects",
      faq1H2: "Which opportunities does the digital era offer to cultural institutions?",
      faq1Body: "<p>What creative energy is unleashed by making digital cultural data openly accessible and freely usable? Digital availability of cultural goods changes the relationship between cultural institutions and individuals interested in culture.</p><p>Unfortunately, this potential is often overlooked. Yet in our increasingly digital world, online interaction with visitors is key for archives, museums, libraries and other cultural institutions.</p><p>More and more cultural institutions digitalized their collections, creating the possibility to grant access to these collections to a wider public. At the same time, there were many concerns that opening up digital cultural heritage could devalue it if used out of context or re-used for commercial purposes. Some institutions feared the loss of their authority. Coding da Vinci sought to alleviate these concerns and encourage active exploration of the perspectives and questions that digitization brings.</p>",
      faq1Body: "<p>What creative energy is unleashed by making digital cultural data openly accessible and freely usable? Digital availability of cultural assets changes the relationship between cultural institutions and people interested in culture.</p><p>Unfortunately, this potential is often overlooked. Yet in our increasingly digital world, online interaction with visitors is key for archives, museums, libraries and other cultural institutions.</p><p>More and more cultural institutions have digitized their collections, creating the possibility of granting access to these collections to a wider public. At the same time, there were many concerns that opening up digital cultural heritage could devalue it if used out of context or reused for commercial purposes. Some institutions feared the loss of their authority. Coding da Vinci sought to alleviate these concerns and encourage active exploration of the perspectives and questions that digitization brings.</p>",
      faq2H2: "Which goals did Coding da Vinci pursue?",
      faq2Body: "<p>Coding da Vinci's project archive (accessible via the <a href=\"https://web.archive.org/web/20260101000000*/codingdavinci.de\" target=\"_blank\" rel=\"noopener\">archived version</a> of this site) served as inspiration for curators and managers of digital collections. There, they could find and experience the potential of openly accessible and re-usable cultural data.</p><p>With its first regional edition in 2016, Coding da Vinci evolved from a Germany-wide event into a decentralized project with regional focus. From then on, hackathons took place in Hamburg, Berlin-Brandenburg, Leipzig, the Rhein-Main region, southern Germany, the Westfalia and Ruhr region, the greater Saar-Lor-Lux region (for the first time fully cross-border), Lower Saxony, Schleswig-Holstein, the Rhineland/Lower Rhine region, Baden-Württemberg and (also cross-border) Saxony, Poland and the Czech Republic.</p><p>The long-term vision of Coding da Vinci was to establish lasting structures enabling cultural institutions to collaborate with interested members of civil society based on open data. The goal was to bring about structural change in cultural heritage institutions, establish open data as a subject on the political agenda, and increase awareness of the accessibility of cultural heritage throughout society.</p>",
      cookieBannerAriaLabel: "Cookie consent",
      cookieBannerMessage1: "We use cookies to improve your experience on our website. More information <a href=\"https://www.dnb.de/EN/Service/Datenschutz/datenschutz_node.html\" target=\"_blank\" rel=\"noopener\">here</a>.",
      cookieBannerMessage2: "Click “Accept” to agree.",
      cookieBannerAccept: "Accept",
      cookieBannerDecline: "No, thanks",
      videoConsentNoticeLink: "Video loads after consent for external content.",
      videoDirectYoutube: "Watch directly on YouTube",
      error404Heading: "404 - Page not found",
      error404Text: "<p>Oops! This page is playing hide and seek.</p><p>The official Coding da Vinci website went offline in June 2026 \u2013 but don\u2019t worry: the Wayback Machine has everything safely archived. Find it <a href=\"https://web.archive.org/web/20260101000000*/codingdavinci.de\" target=\"_blank\" rel=\"noopener\">here in the web archive</a>.</p>",
      error404Home: "Back to homepage"
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

  function applyTranslations(lang) {
    document.documentElement.setAttribute("lang", lang);

    var pageTitleKey = document.body && document.body.classList.contains("path-404")
      ? "title404"
      : "title";
    var title = formatMessage(lang, pageTitleKey) || formatMessage(lang, "title");
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

    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria-label");
      if (!key) return;

      var label = formatMessage(lang, key);
      if (label != null) {
        el.setAttribute("aria-label", label);
      }
    });

    document.querySelectorAll("[data-i18n-href-de][data-i18n-href-en]").forEach(function (el) {
      var href = lang === "de"
        ? el.getAttribute("data-i18n-href-de")
        : el.getAttribute("data-i18n-href-en");
      if (href) {
        el.setAttribute("href", href);
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

  var initial = getLangFromUrl() || getLangFromBrowser() || "en";
  setLang(initial, { updateUrl: getLangFromUrl() != null });
})();
