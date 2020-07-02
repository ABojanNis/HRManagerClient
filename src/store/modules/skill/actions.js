import Vue from "vue";

export default {
  async getAll() {
    let result = await Vue.prototype.$repos.SkillRepository.all();
    if (result && result.data) {
      return result.data;
    }
  },

  async getPaginated(context, payload) {
    let result = await Vue.prototype.$repos.SkillRepository.paginated(
      payload.searchString,
      payload.pagination
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async store(context, payload) {
    let result = await Vue.prototype.$repos.SkillRepository.store(payload.data);
    if (result && result.data) {
      return result.data;
    }
  },

  async update(context, payload) {
    let result = await Vue.prototype.$repos.SkillRepository.update(
      payload.skillId,
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async delete(context, payload) {
    let result = await Vue.prototype.$repos.SkillRepository.delete(
      payload.skillId
    );
    if (result && result.data) {
      return result.data;
    }
  }
};
