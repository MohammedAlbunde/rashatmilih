class MenuManager {
    constructor() {
        this.menuContainer = document.getElementById('menu-items-container');
        this.items = menuItems; // from menu-data.js
    }

    formatPrice(price) {
        return price.toFixed(2);
    }

    createMenuItemCard(item) {
        return `
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-text">${item.description}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="h5 mb-0">$${this.formatPrice(item.price)}</span>
                            <button class="btn-add-cart" onclick="cart.addItem('${item.id}', '${item.name}', ${item.price})">
                                Add to Cart <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMenu() {
        if (!this.menuContainer) return;
        
        let menuHTML = '';
        for (const itemId in this.items) {
            menuHTML += this.createMenuItemCard(this.items[itemId]);
        }
        this.menuContainer.innerHTML = menuHTML;
    }

    updatePrice(itemId, newPrice) {
        if (this.items[itemId]) {
            this.items[itemId].price = newPrice;
            this.renderMenu();
            // You might want to save to localStorage or server here
        }
    }

    addItem(itemData) {
        if (!itemData.id) return;
        this.items[itemData.id] = itemData;
        this.renderMenu();
        // You might want to save to localStorage or server here
    }

    removeItem(itemId) {
        if (this.items[itemId]) {
            delete this.items[itemId];
            this.renderMenu();
            // You might want to save to localStorage or server here
        }
    }
}

// Initialize menu manager
const menuManager = new MenuManager();

// Example usage:
// To update a price: menuManager.updatePrice('dolma', 15.99);
// To add a new item: menuManager.addItem({id: 'newItem', name: 'New Dish', price: 19.99, ...});
// To remove an item: menuManager.removeItem('dolma');
