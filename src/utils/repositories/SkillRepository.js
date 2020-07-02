import Repo from "./Repo";

export default class SkillRepository extends Repo {
  constructor() {
    super("skills");
  }

  all() {
    return super.all();
  }

  paginated(q, data) {
    return super.paginated(q, data);
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
}
