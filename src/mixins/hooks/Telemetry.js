import * as Sentry from "@sentry/browser";
import store from "@/store";
import i18n from "@/i18n";

class SessionData {
  constructor () {
    this.data = {
      "LoggedIn": store.getters["auth/loggedIn"],
      "Username": store.getters["auth/username"] || "(null)",
      "LanguageActive": i18n.locale || "(null)",
      "LanguagePersisted": store.getters["settings/language"] || "(null)",
      "Theme": store.getters["settings/dark"] ? "Dark" : "Light"
    }
  }

  get normal () {
    return this.data
  }

  get crisp () {
    return [[
      ...Object.entries(this.data)
    ]];
  }
}

export default {
  created () {
    const sessionData = new SessionData();

    // set crisp session data
    window.$crisp.push(["set", "session:data", sessionData.crisp]);
    window.$crisp.push(["safe", true]);

    // set sentry tags
    Sentry.configureScope(scope => scope.setTags(sessionData.normal));
  }
}