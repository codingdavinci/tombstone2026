(function () {
  "use strict";

  function buildAddress(el) {
    var user = el.getAttribute("data-email-user") || "";
    var domain = el.getAttribute("data-email-domain") || "";
    var tld = el.getAttribute("data-email-tld") || "";

    user = user.trim();
    domain = domain.trim();
    tld = tld.trim();

    if (!user || !domain) return null;

    var host = tld ? domain + "." + tld : domain;
    return user + "@" + host;
  }

  function upgradeEmailElement(el) {
    var address = buildAddress(el);
    if (!address) return;

    var a = document.createElement("a");
    a.className = el.className;
    a.setAttribute("href", "mailto:" + address);
    a.setAttribute("rel", "nofollow");
    a.textContent = address;

    // Preserve data attributes (useful for debugging / future transforms).
    ["data-email-user", "data-email-domain", "data-email-tld"].forEach(function (attr) {
      var value = el.getAttribute(attr);
      if (value != null) a.setAttribute(attr, value);
    });

    el.replaceWith(a);
  }

  function init() {
    document
      .querySelectorAll(".js-email[data-email-user][data-email-domain]")
      .forEach(function (el) {
        upgradeEmailElement(el);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
