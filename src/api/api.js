import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
//const BASE_URL =  "http://localhost:3001";

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
  static async getHotel() {
    let res = await axios.get(`${BASE_URL}/hoteldata`)
    // console.log(res)
    return res
  }

  static async getHotelByCity() {
    let res = await axios.get(`${BASE_URL}/hotelcitydata`)
    // console.log(res)
    return res
  }

  static async getHotelByState() {
    let res = await axios.get(`${BASE_URL}/hotelstatedata`)
    // console.log(res)
    return res
  }

  static async getHotelInfomation(hotelCode, adult, children) {
    console.log(hotelCode, adult, children)
    let res = await axios.get(`${BASE_URL}/hotel`,{ params:{hotelCode:`${hotelCode}`,adult:`${adult}`,children:`${children}`}})
    console.log(res)
    return res
  }

  static async getGoogleMap(coordinates) {
    console.log(coordinates)
    let res = await axios.get(`${BASE_URL}/hotel/google`,{params:{lat:`${coordinates.lat}`,lng:`${coordinates.lng}`}})
    console.log(res)
    return res
  }

  static async getCityHotelInfomation(cityCode, stateCode, adult, children){
    console.log(cityCode, stateCode, adult, children)
    let res = await axios.get(`${BASE_URL}/city`,{ params:{cityCode:`${cityCode}`, stateCode:`${stateCode}`, adult:`${adult}`,children:`${children}`}})
    console.log(res)
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
static async savePlan(username, planData){
let res = await this.request(`users/${username}`, planData, "post");
return res.plan
}

 /** Get user's plan. */
static async getUserPlan(username) {
let res =await this.request(`users/${username}/plan`)
// console.log(res)
return res
 }

static async deletePlan(username, planId){
  let res = await this.request(`users/${username}/${planId}`, "delete");
  return res;
}

}

HotelApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default HotelApi;