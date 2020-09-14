import Repo from "./Repo";

export default class CandidateRepository extends Repo {
  constructor() {
    super("candidates");
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

  storeComment(candidateId, data) {
    return this.http
      .post(this.resource + "/" + candidateId + "/comments", data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  updateComment(commentId, data) {
    return this.http
      .put(this.resource + "/comments/" + commentId, data)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }

  deleteComment(candidateId, commentId) {
    return this.http
      .delete(this.resource + "/" + candidateId + "/comments/" + commentId)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(response => {
        return Promise.reject(response);
      });
  }
}
