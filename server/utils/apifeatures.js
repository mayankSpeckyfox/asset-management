class ApiFeatures {
  constructor(query, queryStr, property) {
    this.query = query;
    this.queryStr = queryStr;
    this.property = property;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          property: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
