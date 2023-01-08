const dto = require('../dto/dto');
const {Reviews, Comments} = require("../shemas/shemas");

class SearchService {
    async getHelpText(value) {
        try {
            const filter = dto.helpText(value);
            const res = [];
            const reviews = await Reviews.find(filter);

            reviews.forEach(r => {
                if(r){
                    const name = filter.hashtags ? r.hashtags.find(f => f.indexOf(value) > -1) : r.name;
                    const subject = filter.hashtags ? 'hashtag' : 'title';
                    res.push({id: r._id, name, subject})
                }
            })
            const comments = await Comments.find({text: RegExp(`^${value}`, 'gi')});
            comments.forEach(c => {
                if(c){
                    const f = res.find(f => f.id == c.reviewID);
                    if (!f) {
                        const name = c.text.match(value,'gi').input;
                        res.push({id: c.reviewID, name, subject: 'comment'})
                    }
                }
            });
            return res;
        } catch (e) {
            throw e;
        }
    }
}

module.exports = new SearchService();