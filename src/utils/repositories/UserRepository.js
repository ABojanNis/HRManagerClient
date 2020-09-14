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

  delete(id) {
    return super.delete(id);
  }

  changePassword(userId, data) {
    return this.http
      .post(this.resource + "/" + userId + "/changePassword", data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }
}
