export default class Storage {
    constructor() {
        this.collections = [];
        this.load();
    }

    load() {
        let raw = localStorage.getItem('collections');

        if (raw)
            this.collections = JSON.parse(raw);
    }

    getElements(id) {
        let txt;
        for (let i = 0; i < this.collections.length; i++) {
            if (this.collections[i].id === id) {
                txt = "COLLECTION: " + " Title: " + this.collections[i].title + ", Comment: " + this.collections[i].comment + ", Categories: " + this.collections[i].categories;
                for (let s = 0; s < this.collections[i].cards.length; s++) {
                    txt = txt + "    CARD: " + " Title: " + this.collections[i].cards[s].title + ", Comment: " + this.collections[i].cards[s].comment;
                }
            }
        }
        return txt;
        console.log(txt);
    }


    //Collection

    addCollection(data) {
        data.id = Date.now();
        data.date = this.getDate();
        data.cards = [];

        this.collections.push(data);
        this.flush();
    }

    deleteCollection(id) {
        for (let i = 0; i < this.collections.length; i++) {
            if (this.collections[i].id === id) {
                this.collections.splice(i, 1);
            }
        }

        this.flush();
    }

    getCollectionById(collectionId) {
        return this.collections.find(c => c.id == collectionId);
    }

    //Card

    addCardToCollection(collectionId, card) {
        card.id = Date.now();
        card.date = this.getDate();

        let collection = this.getCollectionById(collectionId);

        collection.cards.push(card);
        this.flush();
    }

    deleteCard(id) {
        for (let i = 0; i < this.collections.length; i++) {
            for (let s = 0; s < this.collections[i].cards.length; s++) {
                if (this.collections[i].cards[s].id === id) {
                    this.collections[i].cards.splice(s, 1);
                }
            }
        }

        this.flush();
    }

    getCardByID(cardId) {
        for (let i = 0; i < this.collections.length; i++) {
            for (let s = 0; s < this.collections[i].cards.length; s++) {
                if (this.collections[i].cards[s].id === cardId) {
                    return this.collections[i].cards[s];

                }
            }
        }
    }




    flush() {
        localStorage.setItem('collections', JSON.stringify(this.collections));
    }

    getDate() {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var hour = date.getHours();
        var min = date.getMinutes();
        var numb = 10;

        if (day < numb) {
            day = "0" + day;
        }
        if (month < numb) {
            month = "0" + month;
        }
        if (hour < numb) {
            day = "0" + hour;
        }
        if (min < numb) {
            min = "0" + min;
        }

        return day + "." + month + "." + year + " " + hour + ":" + min;

    }
}
