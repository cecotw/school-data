import fetchJsonp from 'fetch-jsonp';
import qs from 'querystringify';
import Vue from 'vue';
import convert from 'xml-js';

export class ApiService {
  constructor (environment, token) {
    this.environment = environment;
    this._token = token;
    this.initHttpMethods();
  }

  get apiBasePath() {
    return this.environment.apiHost;
  };

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

  $getJsonp (url, data, init = {}) {
    return fetchJsonp(`${url}${qs.stringify(data, true)}`, init)
      .then(res => res.json());
  }

  $post (url, data, init = {}, target = null) {
    return this.buildFetch('POST', url, data, init, target);
  }

  $patch (url, data, init = {}, target = null) {
    return this.buildFetch('PATCH', url, data, init, target);
  }

  $put (url, data, init = {}, target = null) {
    return this.buildFetch('PUT', url, data, init, target);
  }

  $delete (url, data, init = {}, target = null) {
    return this.buildFetch('DELETE', url, data, init, target);
  }
}
