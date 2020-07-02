import Vue from "vue";

export default {
  async getPaginated(context, payload) {
    let result = await Vue.prototype.$repos.CandidateRepository.paginated(
      payload.searchString,
      payload.pagination
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async getSingle(context, payload) {
    let result = await Vue.prototype.$repos.CandidateRepository.get(
      payload.candidateId
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async store(context, payload) {
    let result = await Vue.prototype.$repos.CandidateRepository.store(
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async update(context, payload) {
    let result = await Vue.prototype.$repos.CandidateRepository.update(
      payload.candidateId,
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async delete(context, payload) {
    let result = await Vue.prototype.$repos.CandidateRepository.delete(
      payload.candidateId
    );
    if (result && result.data) {
      return result.data;
    }
  }
};
