class MenuManager {
    constructor() {
        console.log('MenuManager: Initializing...');
        this.menuContainer = document.getElementById('menu-items-container');
        if (!this.menuContainer) {
            console.error('MenuManager: Could not find menu-items-container element');
            return;
        }
        
        if (typeof menuItems === 'undefined') {
            console.error('MenuManager: menuItems is not defined. Make sure menu-data.js is loaded first');
            return;
        }
        
        console.log('MenuManager: menuItems loaded:', menuItems);
        this.items = menuItems; // from menu-data.js
    }

    formatPrice(price, unit) {
        if (!price) return '';
        return `${price.toFixed(2)} CAD${unit ? ' ' + unit : ''}`;
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
        const priceDisplay = item.price ? this.formatPrice(item.price, item.unit) : 'Coming Soon';
        
        return `
            <div class="col-lg-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-text">${item.description}</p>
                        <div class="menu-item-actions">
                            <div class="price-tag">
                                <span class="h5 mb-0">${priceDisplay}</span>
                            </div>
                            ${item.price ? `
                                <div class="action-buttons">
                                    <button class="btn btn-primary" onclick="cart.addItem('${item.id}', '${item.name}', ${item.price})">
                                        <i class="fas fa-cart-plus"></i> Add to Cart
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMenu() {
        console.log('MenuManager: Rendering menu...');
        if (!this.menuContainer) {
            console.error('MenuManager: Cannot render menu - container not found');
            return;
        }
        
        let menuHTML = '';
        // First render special note if exists
        if (this.items.specialNote) {
            menuHTML += this.createMenuItemCard(this.items.specialNote);
        }
        
        console.log('MenuManager: Creating menu items...');
        // Then render all other items
        for (const itemId in this.items) {
            if (itemId !== 'specialNote') {
                console.log(`MenuManager: Creating card for ${itemId}`);
                menuHTML += this.createMenuItemCard(this.items[itemId]);
            }
        }
        
        console.log('MenuManager: Setting innerHTML...');
        this.menuContainer.innerHTML = menuHTML;
        console.log('MenuManager: Menu rendered successfully');
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

// Initialize menu manager and render menu
console.log('Creating MenuManager instance...');
const menuManager = new MenuManager();

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Rendering menu...');
    menuManager.renderMenu();
});

// Example usage:
// To update a price: menuManager.updatePrice('dolma', 15.99);
// To add a new item: menuManager.addItem({id: 'newItem', name: 'New Dish', price: 19.99, ...});
// To remove an item: menuManager.removeItem('dolma');
