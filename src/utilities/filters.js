import Vue from 'vue';

Vue.filter('capitalize', (value) => {
  if (!value) return value;
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.filter('decamel', (value) => {
  if (!value) return value;
  return value.replace(/([A-Z]+)/g, ' $1').replace(/([A-Z][a-z])/g, ' $1');
});

Vue.filter('deunderscore', (value) => {
  if (!value) return value;
  return value.replace(/_/g, ' ');
});

Vue.filter('sort', (value, prop) => {
  if (!value) return value;
  if (!prop) {
    return value.sort((a, b) => a - b);
  } else {
    return value.sort((a, b) => {
      var nameA = a[prop].toUpperCase();
      var nameB = b[prop].toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
});

Vue.prototype.$filters = Vue.options.filters;
