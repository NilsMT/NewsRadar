export class Article {
    id_news
    title;
    link;
    creator;
    description;
    date;
    categories;
    language;
    image_url;
    source_url;
    source_icon;

    constructor(obj) {
        Object.assign(this, obj);
    }
}
