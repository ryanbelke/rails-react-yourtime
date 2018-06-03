import request from 'axios';
import ReactOnRails from 'react-on-rails';

const API_URL = '/services.json';

export default {

  /**
   * Retrieve list of entities from server using AJAX call.
   *
   * @returns {Promise} - Result of ajax call.
   */
  fetchEntities() {
    return request({
      method: 'GET',
      url: API_URL,
      responseType: 'json',
    });
  },

  /**
   * Submit new entity to server using AJAX call.
   *
   * @param {Object} entity - Request body to post.
   * @returns {Promise} - Result of ajax call.
   */
  submitEntity(entity) {
    return request({
      method: 'POST',
      url: API_URL,
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: {section: entity},
    });
  },
  postBooking(workplace, location, category, section) {
    return request({
      method: 'POST',
      url: '/booking',
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: { workplace: workplace, location: location, category: category, section: section }
    });
  },
  postService(service) {
    return request({
      method: 'POST',
      url: '/service',
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: { service: service },
    });
  },
  postAddOn(addOn) {
    return request({
      method: 'POST',
      url: '/addOn',
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: { service: addOn },
    });
  },
/*  createBooking(url, stripeToken, railsToken) {
    return request({
      method: 'POST',
      url: url,
      data: { stripeToken: stripeToken },
      headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'X-CSRF-Token': railsToken,
       'X-Requested-With': 'XMLHttpRequest',
    }}
    )
  },*/
  createBooking(url, stripeToken, railsToken, bookingMessage) {
    return request({
      method: 'POST',
      url: url,
      headers: ReactOnRails.authenticityHeaders(),
      data: {stripeToken: stripeToken, booking_notes: bookingMessage}
    })
  },
  checkDiscount(discount, current_user) {
    return request({
      method: 'POST',
      url: '/discount',
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),
      data: { discount_code: discount, current_user: current_user },
    });
  },

  getWorkplaces() {
    return request({
      method: 'GET',
      url: '/workplaces.json',
      responseType: 'json',
    });
  },
  getCategories(selectedWorkplace) {
    return request({
      method: 'GET',
      url: `/workplaces/${selectedWorkplace}/categories.json`,
      responseType: 'json',
    });
  },
  getLocations(selectedCategory) {
    return request({
      method: 'GET',
      url: `/categories/${selectedCategory}/locations.json`,
      responseType: 'json',
    });
  },
  getSections(selectedLocation) {
    return request({
      method: 'GET',
      url: `/locations/${selectedLocation}/sections.json`,
      responseType: 'json',
    });
  },
  getServices(selectedSection) {
    return request({
      method: 'GET',
      url: `/sections/${selectedSection}/services.json`,
      responseType: 'json',
    });
  }
};
