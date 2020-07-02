import Vue from "vue";

export default {
  async getAll() {
    let result = await Vue.prototype.$repos.ExperienceRepository.all();
    if (result && result.data) {
      return result.data;
    }
  },

  async getPaginated(context, payload) {
    let result = await Vue.prototype.$repos.ExperienceRepository.paginated(
      payload.searchString,
      payload.pagination
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async store(context, payload) {
    let result = await Vue.prototype.$repos.ExperienceRepository.store(
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async update(context, payload) {
    let result = await Vue.prototype.$repos.ExperienceRepository.update(
      payload.experienceId,
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async delete(context, payload) {
    let result = await Vue.prototype.$repos.ExperienceRepository.delete(
      payload.experienceId
    );
    if (result && result.data) {
      return result.data;
    }
  }
};
