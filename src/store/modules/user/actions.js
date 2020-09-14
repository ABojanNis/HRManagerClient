import Vue from "vue";

export default {
  async getPaginated(context, payload) {
    let result = await Vue.prototype.$repos.UserRepository.paginated(
      payload.searchString,
      payload.pagination
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async store(context, payload) {
    let result = await Vue.prototype.$repos.UserRepository.store(payload.data);
    if (result && result.data) {
      return result.data;
    }
  },

  async update(context, payload) {
    let result = await Vue.prototype.$repos.UserRepository.update(
      payload.userId,
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async delete(context, payload) {
    let result = await Vue.prototype.$repos.UserRepository.delete(
      payload.userId
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async changePassword(context, payload) {
    let result = await Vue.prototype.$repos.UserRepository.changePassword(
      payload.userId,
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  }
};
