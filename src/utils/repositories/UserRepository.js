import Repo from "./Repo";

export default class UserRepository extends Repo {
  constructor() {
    super("users");
  }

  all() {
    return super.all();
  }

  paginated(q, data) {
    return super.paginated(q, data);
  }

  get(id) {
    return this.http
      .get(this.resource + "/" + id)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  store(data) {
    return super.store(data);
  }

  update(id, data) {
    return super.update(id, data);
  }

  delete(id, isAdmin) {
    return this.http
      .delete(this.resource + "/" + id + "/" + isAdmin)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  changePassword(id, data) {
    return this.http
      .post(this.resource + "/" + id + "/changePassword", data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }
}
