export default class CollectionList {
    constructor(container) {
        this.container = container
    }

    render(cards, filter) {
        this.container.innerHTML = ''

        cards.forEach(card => {
            if(filter){
                if(!this.cardContainsPhrase(card, filter))
                    return
            }

            let htmlElement = this.createListElement(card)

            this.container.append(htmlElement)
        })
    }

    cardContainsPhrase(card, phrase){
        return card.title.includes(phrase) || card.comment.includes(phrase)
    }

    createListElement(card) {
        var newCard = document.createElement("div");
        var cardTitle = document.createElement("div");
        var cardComment = document.createElement("div");
        var cardDate = document.createElement("div");
        var cardSettingsButton = document.createElement("div");
        var dropDownMenu = document.createElement("div");
        var dropDownEdit = document.createElement("a")
        var dropDownDelete = document.createElement("a");

        cardTitle.classList.add("card-title");
        cardComment.classList.add("card-comment");
        cardSettingsButton.className = "fas fa-ellipsis-h";
        dropDownMenu.classList.add("dropdown-content")
        dropDownEdit.classList.add("drop-down-edit");
        dropDownDelete.classList.add("drop-down-delete");
        //cardContainer.className = "create-collection-window";
        cardTitle.innerHTML = card.title;
        cardComment.innerHTML = card.comment;
        cardDate.innerHTML = card.date;
        dropDownEdit.innerHTML = "Edit";
        dropDownDelete.innerHTML = "Delete";

        newCard.appendChild(dropDownMenu);
        newCard.appendChild(cardSettingsButton)
        newCard.appendChild(cardTitle);
        newCard.appendChild(cardComment);
        newCard.appendChild(cardDate);
        dropDownMenu.appendChild(dropDownEdit);
        dropDownMenu.appendChild(dropDownDelete);




        newCard.classList.add("card-frame");


        cardSettingsButton.addEventListener("click", () => dropDownMenu.classList.add("show"));
        dropDownDelete.addEventListener('click', () => this.deleteCard(card.id))
        dropDownEdit.addEventListener('click', () => this.editCard(card.id))

        return newCard;
    }
}
