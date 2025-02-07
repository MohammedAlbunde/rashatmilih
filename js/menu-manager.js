// Wait for menu data to be available
window.addEventListener('DOMContentLoaded', function() {
    class MenuManager {
        constructor() {
            console.log('MenuManager: Initializing...');
            this.menuContainer = document.getElementById('menu-items-container');
            if (!this.menuContainer) {
                console.error('MenuManager: Could not find menu-items-container element');
                return;
            }
            
            if (typeof window.menuItems === 'undefined') {
                console.error('MenuManager: menuItems is not defined. Make sure menu-data.js is loaded first');
                return;
            }
            
            console.log('MenuManager: menuItems loaded:', window.menuItems);
            this.items = window.menuItems;
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
            try {
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
            } catch (error) {
                console.error('Error creating menu item card:', error);
                return '';
            }
        }

        renderMenu() {
            console.log('MenuManager: Rendering menu...');
            if (!this.menuContainer) {
                console.error('MenuManager: Cannot render menu - container not found');
                return;
            }
            
            try {
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
            } catch (error) {
                console.error('Error rendering menu:', error);
            }
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

    // Initialize menu manager only after DOM is loaded
    try {
        console.log('Creating MenuManager instance...');
        window.menuManager = new MenuManager();
        window.menuManager.renderMenu();
    } catch (error) {
        console.error('Error initializing MenuManager:', error);
    }
});
