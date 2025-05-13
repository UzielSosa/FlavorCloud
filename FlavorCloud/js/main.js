// js/main.js

console.log("FlavorCloud Main Script Loaded!");

// --- NUEVA FUNCIÓN PARA APLICAR LAYOUT MASONRY ---
/**
 * Ajusta el grid-row-end de cada tarjeta para lograr un efecto Masonry.
 * Debe llamarse DESPUÉS de que las tarjetas estén en el DOM y preferiblemente
 * DESPUÉS de que las imágenes hayan cargado (o al menos tengan dimensiones).
 */
function applyMasonryLayout() {
    const recipeGrid = document.getElementById('recipe-grid');
    if (!recipeGrid) return; // Salir si no hay grid

    // Obtener valores de CSS (o usar valores fijos si prefieres)
    // Es más robusto leerlos por si cambian en el CSS
    const gridStyle = window.getComputedStyle(recipeGrid);
    const gridRowHeight = parseInt(gridStyle.getPropertyValue('grid-auto-rows')) || 10; // Valor de --grid-row-height
    const gridGap = parseInt(gridStyle.getPropertyValue('gap')) || 20; // Valor de --grid-gap (solo necesitamos el gap vertical si es diferente, pero gap usualmente es igual)

    // Seleccionar todas las tarjetas dentro del grid
    const cards = recipeGrid.querySelectorAll('.recipe-card');

    cards.forEach(card => {
        // Obtener la altura REAL de la tarjeta (incluyendo padding, border, contenido)
        const cardHeight = card.offsetHeight;

        /*
         * Calcular cuántas filas de 'grid-auto-rows' necesita esta tarjeta.
         * Se suma el 'gridGap' a la altura porque el span debe cubrir
         * tanto el contenido como el espacio hasta la siguiente tarjeta.
         * Se divide por la altura de una fila + el espacio de gap entre filas.
         * Math.ceil redondea hacia arriba para asegurar que quepa todo.
         */
        const rowSpan = Math.ceil((cardHeight + gridGap) / (gridRowHeight + gridGap));

        // Aplicar el estilo directamente al elemento de la tarjeta
        card.style.gridRowEnd = `span ${rowSpan}`;
    });
    console.log(`Masonry layout aplicado a ${cards.length} tarjetas.`);
}


// --- CÓDIGO EXISTENTE (MODIFICADO LIGERAMENTE) ---

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM listo para interactuar.");

    const recipeGrid = document.getElementById('recipe-grid');

    if (typeof getSampleRecipes !== 'function' || typeof createRecipeCard !== 'function') {
        console.error("Error: Las funciones getSampleRecipes o createRecipeCard no están definidas.");
        return;
    }

    function loadRecipes() {
        const recipes = getSampleRecipes();

        if (!recipeGrid) {
             console.error("Elemento #recipe-grid no encontrado al intentar limpiar.");
             return;
        }
        recipeGrid.innerHTML = ''; // Limpiar antes de añadir

        recipes.forEach(recipe => {
            const recipeCardElement = createRecipeCard(recipe);
            if (recipeCardElement) {
                 recipeGrid.appendChild(recipeCardElement);
            }
        });

        console.log(`Cargadas ${recipes.length} recetas en el grid.`);

        // --- LLAMADA INICIAL A MASONRY ---
        // Llamamos una vez aquí, pero puede que las imágenes no hayan cargado aún.
        // Es un primer ajuste.
        applyMasonryLayout();

        // --- IMPORTANTE: AJUSTE TRAS CARGA DE IMÁGENES ---
        // Para que el cálculo de altura sea preciso, es mejor re-aplicar el layout
        // cuando las imágenes DENTRO del grid hayan cargado.
        // Forma simple: usar window.onload (se dispara cuando TODO en la página ha cargado)
        // Forma más específica (mejor rendimiento): usar Promises o 'imagesLoaded' library
        // Vamos con window.onload por simplicidad para copiar/pegar:

        // Quita cualquier listener previo para evitar duplicados si loadRecipes se llamara de nuevo
        window.removeEventListener('load', applyMasonryLayout);
        // Añade el listener para que se ejecute cuando todo (imágenes incluidas) esté cargado
        window.addEventListener('load', applyMasonryLayout);

    } // Fin de loadRecipes

    if (recipeGrid) {
        loadRecipes();
    } else {
        console.error("Elemento #recipe-grid no encontrado en el DOM inicial.");
    }

    // Listener del input de búsqueda (SIN CAMBIOS)
    const searchInput = document.querySelector('.navbar-search input[type="search"]');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const searchTerm = event.target.value.toLowerCase();
            console.log("Buscando:", searchTerm);
            // TODO: Implementar lógica de filtrado y volver a llamar a loadRecipes/applyMasonryLayout
        });
    }

    // --- (Opcional) Reajustar el layout si la ventana cambia de tamaño ---
     let resizeTimeout;
     window.addEventListener('resize', () => {
         // Esperar un poco antes de recalcular (debounce) para no sobrecargar
         clearTimeout(resizeTimeout);
         resizeTimeout = setTimeout(applyMasonryLayout, 150); // recalcula 150ms después de parar de redimensionar
     });


}); // Fin de DOMContentLoaded