export default class CollectionList {
    constructor(container) {
        this.container = container
    }

    render(collections, order) {
        var cardsTab = document.querySelector('#cards-tab')
        switch (order) {
            case 'created-ascending':
                cardsTab.classList.add('hidden')
                collections.sort((a, b) => a.id - b.id)
                break

            case 'created-descending':
                cardsTab.classList.add('hidden')
                collections.sort((a, b) => b.id - a.id)
                break

            case 'alphabetical-ascending':
                cardsTab.classList.add('hidden')
                collections.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
                break

            case 'alphabetical-descending':
                cardsTab.classList.add('hidden')
                collections.sort((a, b) => b.title.toLowerCase() < a.title.toLowerCase() ? -1 : 1)
                break
        }

        this.container.innerHTML = ''

        collections.forEach(collection => {
            let htmlElement = this.createListElement(collection)

            this.container.append(htmlElement)
        })
    }




    createListElement(collection) {
        var newCollectionCard = document.createElement("div");
        var collectionSettingsButton = document.createElement("div");
        var collectionTitle = document.createElement("div");
        var collectionComment = document.createElement("div");
        var collectionCategories = document.createElement("div");
        var collectionDate = document.createElement("div");
        var dropDownMenu = document.createElement("div");
        var dropDownEdit = document.createElement("a")
        var dropDownDelete = document.createElement("a");
        var dropDownCreate = document.createElement("a")
        var collectionContainer = document.createElement("div");

        var date = this.getDate();

        collectionTitle.classList.add("collectionTitle");
        collectionComment.classList.add("collectionComment");
        collectionCategories.classList.add("collectionCategories");
        collectionSettingsButton.className = "fas fa-ellipsis-h";
        dropDownMenu.classList.add("dropdown-content")
        dropDownEdit.classList.add("drop-down-edit");
        dropDownDelete.classList.add("drop-down-delete");
        dropDownCreate.classList.add("drop-down-create")
        newCollectionCard.classList.add("collection-card");

        collectionContainer.classList.add("create-collection-window");


        //cardContainer.className = "create-collection-window";
        collectionTitle.innerHTML = collection.title;
        collectionComment.innerHTML = collection.comment;
        collectionCategories.innerHTML = collection.categories;
        collectionDate.innerHTML = date;
        newCollectionCard.style.borderColor = collection.color;
        //collectionDate.innerHTML = this.date;
        dropDownEdit.innerHTML = "Edit";
        dropDownDelete.innerHTML = "Delete";
        dropDownCreate.innerHTML = "Download";

        dropDownMenu.appendChild(dropDownEdit);
        dropDownMenu.appendChild(dropDownDelete);
        dropDownMenu.appendChild(dropDownCreate);

        newCollectionCard.appendChild(dropDownMenu);
        newCollectionCard.appendChild(collectionSettingsButton);
        newCollectionCard.appendChild(collectionTitle);
        newCollectionCard.appendChild(collectionComment);
        newCollectionCard.appendChild(collectionCategories);
        newCollectionCard.appendChild(collectionDate);




        newCollectionCard.classList.add("collection-card");



        newCollectionCard.addEventListener('click', () => this.onCollectionClicked(collection))
        collectionSettingsButton.addEventListener("click", () => dropDownMenu.classList.add("show"));
        dropDownDelete.addEventListener('click', ev => this.delete(collection.id))
        dropDownEdit.addEventListener('click', () => this.edit(collection.id))
        dropDownCreate.addEventListener('click', () => this.create(collection.id))

        //dropDownEdit.addEventListener("click",() =>)


        return newCollectionCard;
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
