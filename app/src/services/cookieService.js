import Cookies from "universal-cookie";

const cookie = new Cookies();

class CookieService {
  get(key) {
    return cookie.get(key);
  }

  set(key, value, options) {
    cookie.set(key, value, options);
  }

  remove(key) {
    cookie.remove(key);
  }

  getAll() {
    cookie.getAll();
  }
}

export default new CookieService();
