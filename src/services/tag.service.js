import { api } from "../services/api.service";

class TagService {
  constructor() {
    this.path = "/tags";
  }

  async createTags(newTag) {
    return (await api.post(this.path, newTag)).data;
  }
}
