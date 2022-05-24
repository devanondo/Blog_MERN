class ApiFeatures {
  constructor(query, queryStr) {
    (this.query = query), (this.queryStr = queryStr);
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  //Category search
  categorySearch() {
    const category = this.queryStr.category
      ? {
          category: {
            $regex: this.queryStr.category,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...category });
    return this;
  }

  //Pagination
  pagination() {
    let resultPerPage = this.queryStr.perpage;
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
