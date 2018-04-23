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
  postBooking() {
    return request({
      method: 'POST',
      url: '/booking',
      responseType: 'json',
      headers: ReactOnRails.authenticityHeaders(),

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
  createBooking(url, stripeToken, railsToken) {
     return request
      .post(
        url,
        { stripeToken:stripeToken},
        { headers: {'Content-Type': 'application/x-www-form-urlencoded', 'X-CSRF-Token': railsToken,
          'X-Requested-With': 'XMLHttpRequest' } }
    )}
};
