class MenuManager {
    constructor() {
        this.menuContainer = document.getElementById('menu-items-container');
        this.items = menuItems; // from menu-data.js
    }

    formatPrice(price) {
        return price ? price.toFixed(2) : '';
    }

    createSpecialNote(item) {
        return `
            <div class="col-12 mb-4">
                <div class="card special-note">
                    <div class="card-body">
                        <p class="card-text">${item.description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    createMenuItemCard(item) {
        // Handle special note
        if (item.id === 'specialNote') {
            return this.createSpecialNote(item);
        }

        // For regular menu items
        const priceDisplay = item.price ? `$${this.formatPrice(item.price)}` : 'Coming Soon';
        const addToCartButton = item.price ? `
            <button class="btn-add-cart" onclick="cart.addItem('${item.id}', '${item.name}', ${item.price})">
                Add to Cart <i class="fas fa-cart-plus"></i>
            </button>
        ` : '';

        return `
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-text">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="h5 mb-0">${priceDisplay}</span>
                            ${addToCartButton}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMenu() {
        if (!this.menuContainer) return;
        
        let menuHTML = '';
        // First render special note if exists
        if (this.items.specialNote) {
            menuHTML += this.createMenuItemCard(this.items.specialNote);
        }
        // Then render all other items
        for (const itemId in this.items) {
            if (itemId !== 'specialNote') {
                menuHTML += this.createMenuItemCard(this.items[itemId]);
            }
        }
        this.menuContainer.innerHTML = menuHTML;
    }

    updatePrice(itemId, newPrice) {
        if (this.items[itemId]) {
            this.items[itemId].price = newPrice;
            this.renderMenu();
        }
    }

    addItem(itemData) {
        if (!itemData.id) return;
        this.items[itemData.id] = itemData;
        this.renderMenu();
    }

    removeItem(itemId) {
        if (this.items[itemId]) {
            delete this.items[itemId];
            this.renderMenu();
        }
    }
}

// Initialize menu manager
const menuManager = new MenuManager();

// Example usage:
// To update a price: menuManager.updatePrice('dolma', 15.99);
// To add a new item: menuManager.addItem({id: 'newItem', name: 'New Dish', price: 19.99, ...});
// To remove an item: menuManager.removeItem('dolma');
