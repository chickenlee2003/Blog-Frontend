import { api } from "../services/api.service";

class TagService {
  constructor() {
    this.path = "/tags";
  }

  async createTag(newTag) {
    return (await api.post(this.path, newTag)).data;
  }

  async getAllTag() {
    return (await api.get(this.path)).data;
  }

  async updateTag(id, tag) {
    return (await api.patch(this.path + `/${id}`, tag)).data;
  }

  async deleteTag(id) {
    return (await api.delete(this.path + `/${id}`)).data;
  }
}

export default new TagService();
