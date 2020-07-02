// SERVICES
import Http from "../../services/Http";

// public sector
export default class Repo {
  constructor(resource) {
    this.http = new Http();
    this.resource = resource;
  }

  all() {
    return this.http
      .get(this.resource)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  paginated(q = undefined, data) {
    let url = this.resource;

    if (q !== undefined) {
      url = url + "?q=" + q;
    }
    return this.http
      .get(url, data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  store(data) {
    return this.http
      .post(this.resource, data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  update(id, data) {
    return this.http
      .put(this.resource + "/" + id, data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  delete(id) {
    return this.http
      .delete(this.resource + "/" + id)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }
}
