
        // --- 1. Product Data (Array of Objects) ---
        const products = [
            {
                id: 1,
                name: "Monstera Deliciosa",
                price: "$45.00",
                category: "tropical",
                image: "Images/Monstera_Deliciosa.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            },
            {
                id: 2,
                name: "Echeveria Elegans",
                price: "$15.00",
                category: "succulent",
                image: "Images/Echeveria_Elegans.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            },
            {
                id: 3,
                name: "Fiddle Leaf Fig",
                price: "$60.00",
                category: "tropical",
                image: "Images/fiddle_leaf.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            },
            {
                id: 4,
                name: "Zebra Cactus",
                price: "$22.00",
                category: "succulent",
                image: "Images/Zebra_cactus.webp?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
            }
        ];

        // --- 2. Page Navigation Logic ---
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page-section').forEach(section => {
                section.classList.remove('active-page');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active-page');

            // Update Navigation Active State
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            const activeNav = document.getElementById(`nav-${pageId}`);
            if(activeNav) activeNav.classList.add('active');

            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
            
            // Scroll to top
            window.scrollTo(0, 0);
        }

        function toggleMobileMenu() {
            document.getElementById('mobile-menu').classList.toggle('hidden');
        }

        // --- 3. Product Rendering & Filtering Logic ---
        const container = document.getElementById('products-container');

        function renderProducts(filter = 'all') {
            container.innerHTML = ''; // Clear current
            
            products.forEach(product => {
                if (filter === 'all' || product.category === filter) {
                    const card = document.createElement('div');
                    card.className = 'product-card bg-white rounded-lg shadow-sm border border-stone-100 overflow-hidden';
                    
                    card.innerHTML = `
                        <div class="h-64 overflow-hidden relative">
                            <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                            <span class="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 text-xs font-bold rounded uppercase tracking-wider text-stone-600">
                                ${product.category}
                            </span>
                        </div>
                        <div class="p-5">
                            <h3 class="text-xl font-bold mb-1">${product.name}</h3>
                            <div class="flex justify-between items-center mt-4">
                                <span class="text-green-700 font-bold text-lg">${product.price}</span>
                                <button onclick="addToCart('${product.name}')" class="text-stone-600 hover:text-green-700 font-semibold text-sm border border-stone-300 hover:border-green-700 px-3 py-1 rounded transition">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    `;
                    container.appendChild(card);
                }
            });
        }

        // Handle Filter Button Clicks (Visual styling)
        function filterProducts(category) {
            renderProducts(category);
            
            // Update button styles would go here (optional enhancement)
            const buttons = document.querySelectorAll('.filter-btn');
            buttons.forEach(btn => {
                // Reset all to default style
                btn.classList.remove('bg-stone-800', 'text-white');
                btn.classList.add('bg-stone-200', 'text-stone-600');
                
                // Highlight active button (Logic simplified for readability)
                if(btn.innerText.toLowerCase().includes(category) || (category === 'all' && btn.innerText === 'All')) {
                    btn.classList.remove('bg-stone-200', 'text-stone-600');
                    btn.classList.add('bg-stone-800', 'text-white');
                }
            });
        }

        // --- 4. Form Submission Logic ---
        function submitForm(event) {
            event.preventDefault();
            const name = document.getElementById('formName').value;
            
            if(name) {
                alert(`Thank you, ${name}! Your message has been sent successfully.`);
                event.target.reset();
            }
        }

        // --- 5. Cart Logic (Toast Notification) ---
        function addToCart(productName) {
            const toast = document.getElementById('toast');
            toast.innerText = `${productName} added to cart!`;
            toast.classList.remove('translate-y-24'); // Show
            
            setTimeout(() => {
                toast.classList.add('translate-y-24'); // Hide
            }, 3000);
        }

        // Initialize
        renderProducts(); // Load all products on startup
        document.getElementById('nav-home').classList.add('active'); // Set Home active
