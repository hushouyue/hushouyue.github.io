// Active folder for items
let activeItemFolder = 'items/robot';
let isTransitioning = false;
let bookmarksInitialized = false;

function resetExpansions() {
    const visualCols = document.querySelectorAll('.visual-col');
    const morphItems = document.querySelectorAll('.morph-item');
    visualCols.forEach(col => col.classList.remove('is-expanded-view'));
    morphItems.forEach(item => item.style.height = '');
    document.querySelectorAll('img.fit-contain').forEach(img => img.classList.remove('fit-contain'));
}

function loadItems(folder) {
    const container = document.querySelector('.morph-grid');
    if (!container) return Promise.resolve();

    if (folder) {
        activeItemFolder = folder;
    }

    const folderPath = activeItemFolder;

    // Load file list from manifest.json in the active folder
    return fetch(`${folderPath}/manifest.json`)
        .then(res => {
            if (!res.ok) throw new Error(`Failed to load manifest for ${folderPath}`);
            return res.json();
        })
        .then((files) =>
            Promise.allSettled(
                files.map((name) =>
                    fetch(`${folderPath}/${name}`)
                        .then((res) => (res.ok ? res.text() : ''))
                        .catch(() => '')
                )
            )
        )
        .then((results) => {
            const htmlSnippets = results
                .filter((r) => r.status === 'fulfilled' && r.value)
                .map((r) => r.value);
            container.innerHTML = htmlSnippets.join('\n');
        })
        .catch(() => {
            // In case manifest or any fetch fails, render nothing instead of breaking the page
            container.innerHTML = '';
        });
}

function initializeInteractions() {
    const bookmarkRight = document.getElementById('bookmarkRight');
    const bookmarkLeft = document.getElementById('bookmarkLeft');
    const body = document.body;
    const pageTitle = document.querySelector('.page-title');
    const visualCols = document.querySelectorAll('.visual-col');

    // Titles for two modes, sourced from HTML dataset for decoupling
    const robotTitle = body.dataset.robotTitle || pageTitle.textContent;
    const humanTitle = body.dataset.humanTitle || robotTitle;

    // --- IMAGE EXPANSION LOGIC ---
    visualCols.forEach(col => {
        col.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling
            const parentItem = col.closest('.morph-item');
            const isExpanded = col.classList.contains('is-expanded-view');
            const isWhiteMode = body.classList.contains('white-mode');
            
            // Determine active image based on mode
            const activeImg = isWhiteMode 
                ? col.querySelector('.img-robot') 
                : col.querySelector('.img-human');

            // If there is no image for the current mode (e.g. you removed img-human),
            // just skip the expand logic for this card to avoid JS errors.
            if (!activeImg) return;

            if (!isExpanded) {
                // Expand Logic
                col.classList.add('is-expanded-view');
                
                // Calculate Aspect Ratio Match
                const naturalRatio = activeImg.naturalHeight / activeImg.naturalWidth;
                // Visual column fixed width is 485px
                const targetHeight = 485 * naturalRatio;
                
                // Minimum height 300px. If target < 300, we effectively pad with whitespace (contain)
                const finalHeight = Math.max(targetHeight, 300);
                
                // Set explicit height to trigger transition
                parentItem.style.height = finalHeight + 'px';
                
                // If image is "wide" (height < 300), we must use contain to see sides
                if (targetHeight < 300) {
                    activeImg.classList.add('fit-contain');
                }
            } else {
                // Collapse Logic
                col.classList.remove('is-expanded-view');
                parentItem.style.height = ''; // Revert to CSS default (300px)
                
                // Remove contain class after a short delay or immediately? 
                // Immediately is safer to prevent layout flash
                const allImgs = col.querySelectorAll('img');
                allImgs.forEach(img => img.classList.remove('fit-contain'));
            }
        });
    });

    if (bookmarkRight && !bookmarksInitialized) {
        bookmarkRight.addEventListener('click', () => {
            if (isTransitioning || body.classList.contains('black-mode')) return;
            
            isTransitioning = true;
            // Reset any expanded images to avoid layout glitch on mode switch
            resetExpansions();
            
            body.classList.add('morphing');
            
            setTimeout(() => {
                body.classList.remove('white-mode');
                body.classList.add('black-mode');
                pageTitle.textContent = humanTitle; 
                // Switch to human items when entering black mode
                loadItems('items/human').then(() => {
                    initializeInteractions();
                    // small delay so user先看到新配色，再看到幕布缓慢拉开
                    setTimeout(() => {
                        body.classList.remove('morphing');
                        isTransitioning = false;
                    }, 250);
                });
            }, 400);
        });
    }

    if (bookmarkLeft && !bookmarksInitialized) {
        bookmarkLeft.addEventListener('click', () => {
            if (isTransitioning || body.classList.contains('white-mode')) return;
            
            isTransitioning = true;
            // Reset any expanded images
            resetExpansions();
            
            body.classList.add('morphing-reverse');
            
            setTimeout(() => {
                body.classList.remove('black-mode');
                body.classList.add('white-mode');
                pageTitle.textContent = robotTitle; 
                // Switch back to robot items when returning to white mode
                loadItems('items/robot').then(() => {
                    initializeInteractions();
                    setTimeout(() => {
                        body.classList.remove('morphing-reverse');
                        isTransitioning = false;
                    }, 250);
                });
            }, 400);
        });
        bookmarksInitialized = true;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadItems('items/robot').then(() => {
        initializeInteractions();
    });
});

