import Repo from "./Repo";

export default class UserRepository extends Repo {
  constructor() {
    super("auth/user");
  }

  me() {
    return this.$http
      .get(this.resource + "/me")
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }
}
