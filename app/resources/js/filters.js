import CollectionList from './collection.js'
import CardList from './card.js'
import Storage from './saveData.js'


class App {
    constructor() {
        this.storage = new Storage()

        this.storage = new Storage()
        this.currentID = 0;
        this.cardID = 0;

        this.collectionList = new CollectionList(document.querySelector('#collection-container'))
        this.collectionList.onCollectionClicked = collection => this.selectCollection(collection)
        this.collectionList.edit = collection => this.editCollection(collection)
        this.collectionList.delete = ev => this.openDeleteWindowCollection(ev)
        this.collectionList.create = ev => this.downloadCollections(ev)

        this.cardsList = new CardList(document.querySelector('#card-container'))
        this.cardsList.deleteCard = ev => this.openDeleteWindowCard(ev)
        this.cardsList.editCard = ev => this.editCard(ev)


        this.overlay = document.querySelector('#overlay')
        this.addCollectionButton = document.querySelector('#new-collection-button')
        this.collectionEditor = document.querySelector('#collection-editor')
        this.collectionEditorSaveButton = document.querySelector('#button-save-new-collection')
        this.collectionEditorCancelButton = document.querySelector('#button-cancel-new-collection')
        this.cardsTab = document.querySelector('#cards-tab')
        this.addCardButton = document.querySelector('#new-card-button')
        this.cardEditor = document.querySelector('#card-editor')
        this.cardEditorSaveButton = document.querySelector('#button-save-new-card')
        this.cardEditorCancelButton = document.querySelector('#button-cancel-new-card')
        this.searchBar = document.querySelector('#searchBar')
        this.orderSelection = document.querySelector('#order-selection')
        this.deleteWindow = document.getElementById("delete-window")
        this.deleteButtonCommit = document.getElementById("delete-yes")
        this.deleteButtonCancel = document.getElementById("delete-cancel")
        this.deleteWindowHeading = document.querySelector(".delete-window-heading")
        this.deleteWindowCard = document.getElementById("delete-window-card")
        this.deleteButtonCard = document.getElementById("delete-yes-card")
        this.deleteButtonCardCancel = document.getElementById("delete-cancel-card")
        this.colorSelection = document.querySelector("#color-selection")
        this.closeCards = document.querySelector('#close-cards')
        this.searchCards = document.querySelector('#searchCard')
        this.colorPicker = document.getElementsByClassName("color-field")





        this.collectionEditorSaveButton.addEventListener('click', () => this.saveOrCreateCollection())
        this.collectionEditorCancelButton.addEventListener('click', () => this.closeCollectionEditor())
        this.cardEditorSaveButton.addEventListener('click', () => this.saveOrCreateCard())
        this.cardEditorCancelButton.addEventListener('click', () => this.closeCardEditor())
        this.addCardButton.addEventListener('click', () => this.openCardEditor(null))
        this.closeCards.addEventListener('click',() => this.closeCardsTab())
        this.searchCards.addEventListener('keyup', () => this.searchOpenCards())


        this.searchBar.addEventListener('keyup', () => this.searchCollection())
        this.orderSelection.addEventListener("change", () => this.updateCollectionList())
        this.deleteButtonCommit.addEventListener('click', (ev) => this.deleteCollection(ev))
        this.deleteButtonCancel.addEventListener('click', () => this.closeDeleteWindow())
        this.deleteButtonCard.addEventListener('click', (ev) => this.deleteCard(ev))
        this.deleteButtonCardCancel.addEventListener('click', () => this.closeDeleteCard())
        this.colorSelection.addEventListener('change', () => this.filterAfterColor(this.colorSelection.value))

        document.addEventListener("click", function(ev) {
            if (ev.target.className != "fas fa-ellipsis-h") {
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        })
        this.updateCollectionList()

        for (let i = 0; i < this.colorPicker.length; i++) {
            this.colorPicker[i].addEventListener("click", () => {
                for (let s = 0; s < this.colorPicker.length; s++) {
                    this.colorPicker[s].classList.remove("selected-color")
                }
                this.colorPicker[i].classList.add("selected-color")
            })
        }
    }

    closeCardsTab(){
      this.cardsTab.classList.add('hidden')
    }

    searchOpenCards() {
        this.updateCardList()
    }


    filterAfterColor(ev) {
      this.closeCardsTab()



        var color = ev
        var collection = document.querySelectorAll(".collection-card")

        let input, text

        for (let i = 0; i < collection.length; i++) {
            text = this.storage.collections[i].color


            if (text.indexOf(color) > -1) {
                collection[i].classList.remove("color-filter")
            } else {
                collection[i].classList.add("color-filter")
            }
        }
        if (color === "nothing") {
            for (let i = 0; i < collection.length; i++) {
                collection[i].classList.remove("color-filter")
            }
        }

    }

    searchCollection() {

      this.closeCardsTab()

        let input, text
        var collection = document.querySelectorAll(".collection-card")

        input = this.searchBar.value.toLowerCase();

        for (let i = 0; i < collection.length; i++) {
            text = this.storage.collections[i].categories

            if (text.toLowerCase().indexOf(input) > -1) {
                collection[i].classList.remove("search-filter")
            } else {
                collection[i].classList.add("search-filter")
            }
        }
    }

    downloadCollections(id) {

        const blob = new Blob([this.storage.getElements(id)], {
            type: 'text/plain'
        })
        let title = this.storage.getCollectionById(id).title;
        let txt = this.storage.getElements(id)

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt));
        element.setAttribute('download', title);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }





    editCollection(id) {
        for (let i = 0; i < this.storage.collections.length; i++) {
            if (this.storage.collections[i].id === id) {
                this.openCollectionEditor(this.storage.collections[i])
                this.currentID = id;
            }
        }
    }

    editCard(id) {
        for (let i = 0; i < this.storage.collections.length; i++) {
            for (let s = 0; s < this.storage.collections[i].cards.length; s++) {
                if (this.storage.collections[i].cards[s].id === id) {
                    this.openCardEditor(this.storage.collections[i].cards[s])
                    this.cardID = id;
                }
            }
        }
    }

    closeDeleteWindow() {
        this.deleteWindow.style.visibility = "hidden";
    }

    openDeleteWindowCollection(ev) {
        //ev.stopPropagation()
        this.currentID = ev
        this.deleteWindow.style.visibility = "visible";
    }

    openDeleteWindowCard(ev) {
        //ev.stopPropagation()
        this.cardID = ev
        this.deleteWindowCard.style.visibility = "visible";
    }

    closeDeleteCard() {
        this.deleteWindowCard.style.visibility = "hidden";

    }

		deleteCollection() {
        this.cardsTab.classList.add('hidden')
        this.storage.deleteCollection(this.currentID)
        this.updateCollectionList()
        this.closeDeleteWindow()

    }

    deleteCard() {
        this.storage.deleteCard(this.cardID)
        this.closeDeleteCard()
        this.cardID = 0;
        this.updateCardList()
    }


    // COLLECTIONS

    selectCollection(collection) {
        this.selectedCollectionId = collection.id
        this.cardsTab.classList.remove('hidden')
        this.updateCardList()
    }

    openCollectionEditor(collection) {
        document.getElementById("black").classList.add("selected-color")
        if (collection) {
            document.querySelector(".editor-heading").innerHTML = "Edit Collection";
            document.getElementById("collection-title").value = collection.title;
            document.getElementById("collection-comment").value = collection.comment;
            document.getElementById("collection-categories").value = collection.categories;


        } else {
            document.querySelector(".editor-heading").innerHTML = "Create Collection";
            document.getElementById("collection-title").value = "";
            document.getElementById("collection-comment").value = "";
            document.getElementById("collection-categories").value = "";
        }

        this.overlay.classList.add('active')
        this.collectionEditor.classList.remove('hidden')
    }

    saveOrCreateCollection() {
        var titleInput = document.getElementById("collection-title").value;
        var commentInput = document.getElementById("collection-comment").value;
        var categoriesInput = document.getElementById("collection-categories").value;



        if (this.currentID === 0) {
            this.color = document.querySelector(".color-field.selected-color").id
            this.storage.addCollection({
                color: this.color,
                title: titleInput,
                comment: commentInput,
                categories: categoriesInput

            })
        } else {
            let collection = this.storage.getCollectionById(this.currentID)
            this.color = document.querySelector(".color-field.selected-color").id
            collection.color = this.color
            collection.title = titleInput
            collection.comment = commentInput
            collection.categories = categoriesInput

        }
        this.currentID = 0;
        document.querySelector(".color-field.selected-color").classList.remove("selected-color")


        this.updateCollectionList()
        this.closeCollectionEditor()
        this.storage.flush();

    }

    closeCollectionEditor() {
        this.overlay.classList.remove('active')
        this.collectionEditor.classList.add('hidden')
    }

    updateCollectionList() {
        this.collectionList.render(this.storage.collections, this.orderSelection.value)
    }




    // CARDS

    openCardEditor(card) {
        if (card) {
            document.querySelector("#card-editor .editor-heading").innerHTML = "Edit Card";
            document.getElementById("card-title").value = card.title;
            document.getElementById("card-comment").value = card.comment;
        } else {
            document.querySelector("#card-editor .editor-heading").innerHTML = "Create Card";
            document.getElementById("card-title").value = "";
            document.getElementById("card-comment").value = "";
        }

        this.overlay.classList.add('active')
        this.cardEditor.classList.remove('hidden')
    }

    saveOrCreateCard() {
        var titleInput = document.getElementById("card-title").value;
        var commentInput = document.getElementById("card-comment").value;

        if (this.cardID === 0) {
            this.storage.addCardToCollection(this.selectedCollectionId, {
                title: titleInput,
                comment: commentInput,
            })

        } else {
            var card = this.storage.getCardByID(this.cardID)
            card.title = titleInput
            card.comment = commentInput
        }
        this.cardID = 0;
        this.updateCardList()
        this.closeCardEditor()
        this.storage.flush();
    }

    closeCardEditor() {
        this.cardID=0
        this.overlay.classList.remove('active')
        this.cardEditor.classList.add('hidden')
    }


    updateCardList() {
        this.cardsList.render(this.storage.getCollectionById(this.selectedCollectionId).cards, this.searchCards.value.toLowerCase())
    }




    //Dropdown




}








new App()
