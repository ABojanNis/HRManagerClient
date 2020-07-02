import Vue from "vue";

export default {
  async getAll() {
    let result = await Vue.prototype.$repos.WorkerStatusRepository.all();
    if (result && result.data) {
      return result.data;
    }
  },

  async getPaginated(context, payload) {
    let result = await Vue.prototype.$repos.WorkerStatusRepository.paginated(
      payload.searchString,
      payload.pagination
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async store(context, payload) {
    let result = await Vue.prototype.$repos.WorkerStatusRepository.store(
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async update(context, payload) {
    let result = await Vue.prototype.$repos.WorkerStatusRepository.update(
      payload.workerStatusId,
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async delete(context, payload) {
    let result = await Vue.prototype.$repos.WorkerStatusRepository.delete(
      payload.workerStatusId
    );
    if (result && result.data) {
      return result.data;
    }
  }
};
