export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  create(data) {
    return this.model.create(data);
  }

  findById(id, projection = null, options = {}) {
    return this.model.findById(id, projection, options);
  }

  findOne(filter, projection = null, options = {}) {
    return this.model.findOne(filter, projection, options);
  }

  find(filter = {}, projection = null, options = {}) {
    return this.model.find(filter, projection, options);
  }

  count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  updateById(id, data, options = { new: true, runValidators: true }) {
    return this.model.findByIdAndUpdate(id, data, options);
  }

  deleteById(id) {
    return this.model.findByIdAndDelete(id);
  }
}
