class APIFeatures{
    constructor(query,queryString) {
        this.query=query;
        this.queryString=queryString;
    }
    sort(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
    limitFields(){
        //2- LIMITING --------------->  127.0.0.1:3000/api/v1/posts?fields=auther,text
        if (this.queryString.fields){
            const fields=this.queryString.fields.split(',').join(' ')
            this.query=this.query.select(fields)
        }else {
            this.query=this.query.select('-__v')
        }
        return this;
    }
    paginate(){
        //3- PAGINATION --------------->  127.0.0.1:3000/api/v1/posts?page=2&limit=3
        const page=this.queryString.page*1 || 1;
        const limit=this.queryString.limit*1 || 5;
        const skip=(page -1) * limit;
        this.query =this.query.skip(skip).limit(limit)
        return this;
    }
}

module.exports = APIFeatures;
