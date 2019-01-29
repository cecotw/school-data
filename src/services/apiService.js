import fetchJsonp from 'fetch-jsonp';
import qs from 'querystringify';
import Vue from 'vue';
import convert from 'xml-js';

export class ApiService {
  /**
  * Sets up an API service that wraps basic fetch functionality.
  * Enables the addition of a standard authoriation headers on all API requests
  * @param {object} environment
  * @param {string} token
  */
  constructor (environment, token) {
    this.environment = environment;
    this._token = token;
    this.initHttpMethods();
  }

  get apiBasePath() {
    return this.environment.apiHost;
  };

  /**
   * Adds the HTTP methods to the Vue prototype
   */
  initHttpMethods () {
    if (Vue.prototype.$api === undefined) {
      Vue.prototype.$api = null;
      Vue.prototype.$get = this.$get.bind(this);
      Vue.prototype.$getJsonp = this.$getJsonp.bind(this);
      Vue.prototype.$post = this.$post.bind(this);
      Vue.prototype.$put = this.$put.bind(this);
      Vue.prototype.$patch = this.$patch.bind(this);
      Vue.prototype.$delete = this.$delete.bind(this);
      Vue.prototype.$api = new ApiService(this.environment, this._token);
    }
  }

  /**
   * Builds a fetch request based on the HTTP verb passed
   * @param {string} verb
   * @param {string} url
   * @param {object} data
   * @param {object} init
   * @param {string} target
   */
  buildFetch (verb, url, data, init = {}, target = null) {
    let token = this._token;
    if (url.indexOf('http') === -1) {
      url = this.apiBasePath + url;
    } else {
      // Third party sites should not recieve token
      token = null;
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers.setHeader('Authorization', token);
    }
    return fetch(url, Object.assign({
      body: JSON.stringify(data),
      headers: headers,
      method: verb
    }, init))
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else if (contentType && contentType.indexOf('text/xml') !== -1) {
          return JSON.parse(convert.xml2json(response.text(), { compact: true }));
        } else {
          return response;
        }
      })
      .catch(error => { console.error(error); });
  }

  /**
   * Builds out an GET fetch request
   * @param {string} rawUrl
   * @param {object} data
   * @param {object} init
   * @param {string} target
   */
  $get(rawUrl, data, init = {}, target = null) {
    let url = rawUrl;
    let token = this._token;
    if (url.indexOf('http') === -1) {
      url = this.apiBasePath + url;
    } else {
      // Third party sites should not recieve token
      token = null;
    }
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers.setHeader('Authorization', token);
    }
    return fetch(url, Object.assign({
      headers: headers,
      method: 'GET'
    }, init))
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else if (contentType && contentType.indexOf('text/xml') !== -1) {
          return response.text().then(xml => JSON.parse(convert.xml2json(xml, { compact: true })));
        } else {
          return response;
        }
      })
      .catch(error => {
        return error;
      });
  }

  /**
   * Builds a JSONP fetch request
   * @param {string} url
   * @param {object} data
   * @param {object} init
   */
  $getJsonp (url, data, init = {}) {
    return fetchJsonp(`${url}${qs.stringify(data, true)}`, init)
      .then(res => res.json());
  }

  /**
   * Builds POST request
   * @param {string} url
   * @param {object} data
   * @param {object} init
   * @param {string} target
   */
  $post (url, data, init = {}, target = null) {
    return this.buildFetch('POST', url, data, init, target);
  }

  /**
   * Builds PATCH request
   * @param {string} url
   * @param {object} data
   * @param {object} init
   * @param {string} target
   */
  $patch (url, data, init = {}, target = null) {
    return this.buildFetch('PATCH', url, data, init, target);
  }

  /**
   * Builds PUT request
   * @param {string} url
   * @param {object} data
   * @param {object} init
   * @param {string} target
   */
  $put (url, data, init = {}, target = null) {
    return this.buildFetch('PUT', url, data, init, target);
  }

  /**
   * Builds DELETE request
   * @param {string} url
   * @param {object} data
   * @param {object} init
   * @param {string} target
   */
  $delete (url, data, init = {}, target = null) {
    return this.buildFetch('DELETE', url, data, init, target);
  }
}
