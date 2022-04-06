import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class HotelApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${HotelApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Get all hotels */
  static async getHotels() {
    let res = await axios.get(`${BASE_URL}/hoteldata`)
    return res
  }

  /** Get all cities data*/
  static async getCities() {
    let res = await axios.get(`${BASE_URL}/hotelcitydata`)
    return res
  }

  /** Get all zip code data*/
  static async getZips() {
    let res = await axios.get(`${BASE_URL}/hotelzipdata`)
    return res
  }

  /** Get hotel infomation detail*/
  static async getHotelInfomation(hotelCode, adult, children) {
    let res = await axios.get(`${BASE_URL}/hotel`, { params: { hotelCode: `${hotelCode}`, adult: `${adult}`, children: `${children}` } })
    return res
  }

  /** Triggered google api*/
  static async getGoogleMap(coordinates) {
    let res = await axios.get(`${BASE_URL}/hotel/google`, { params: { lat: `${coordinates.lat}`, lng: `${coordinates.lng}` } })
    return res
  }

  /** Get hotels by city*/
  static async getHotelsByCity(cityCode, stateCode, adult, children, page) {
    let res = await axios.get(`${BASE_URL}/city`, { params: { type: "city", cityCode: `${cityCode}`, stateCode: `${stateCode}`, adult: `${adult}`, children: `${children}`, page: `${page}` } })
    return res
  }
  /** Get hotels by zip code*/
  static async getHotelsByZip(zipCode, adult, children, page) {
    let res = await axios.get(`${BASE_URL}/city`, { params: { type: "zip", zipCode: `${zipCode}`, adult: `${adult}`, children: `${children}`, page: `${page}` } })
    return res
  }

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /** Save plan. */
  static async savePlan(username, planData) {
    let res = await this.request(`plan/${username}`, planData, "post");
    return res.plan
  }

  /** Get user's plan. */
  static async getUserPlan(username) {
    let res = await this.request(`plan/${username}`)
    return res
  }

  /** Delete user's plan. */
  static async deletePlan(username, planId) {
    let res = await this.request(`plan/${username}/${planId}`, {}, "delete");
    return res;
  }

  /** Update plan status */
  static async planStatusChange(username, planId, planStatus) {
    let res = await this.request(`plan/${username}/${planId}`, planStatus, "patch");
    return res;
  }

}

export default HotelApi;