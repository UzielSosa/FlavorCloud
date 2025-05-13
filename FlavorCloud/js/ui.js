console.log("UI Module Loaded");

// --- Funciones de Manipulación del DOM ---

/**
 * Crea un elemento HTML para una tarjeta de receta.
 * @param {object} recipe - El objeto de receta con title, description, imageUrl, etc.
 * @returns {HTMLElement|null} El elemento de la tarjeta creado o null si hay error.
 */
function createRecipeCard(recipe) {
  // Validación básica de la entrada
  if (!recipe || typeof recipe !== 'object') {
    console.error("Datos de receta inválidos:", recipe);
    return null;
  }

  // Crear el contenedor principal de la tarjeta
  const card = document.createElement('div');
  card.classList.add('recipe-card'); // Clase principal para estilos CSS

  // Crear y añadir la imagen
  const img = document.createElement('img');
  // Usar imagen real o placeholder si no existe
  img.src = recipe.imageUrl || 'assets/images/placeholder_recipe.jpg';
  img.alt = recipe.title || 'Imagen de receta'; // Texto alternativo descriptivo
  img.loading = 'lazy'; // Carga diferida para imágenes (mejora rendimiento)
  card.appendChild(img);

  // Crear y añadir el título
  if (recipe.title) {
    const title = document.createElement('h3');
    title.textContent = recipe.title;
    card.appendChild(title);
  }

  // Crear y añadir la descripción
  if (recipe.description) {
    const description = document.createElement('p');
    description.textContent = recipe.description;
    card.appendChild(description);
  }

  // (Opcional) Añadir pie de tarjeta con autor o acciones
  /*
  if (recipe.author) {
      const footer = document.createElement('div');
      footer.classList.add('card-footer'); // Añadir estilos CSS para .card-footer

      const author = document.createElement('span');
      author.textContent = `Por: ${recipe.author}`;
      footer.appendChild(author);

      // Aquí podrías añadir botones de like, guardar, etc.
      // const likeButton = document.createElement('button');
      // likeButton.innerHTML = '<i class="fas fa-heart"></i>'; // Necesitarías FontAwesome o SVGs
      // footer.appendChild(likeButton);

      card.appendChild(footer);
  }
  */

  // Añadir un dataset para identificar la receta si es necesario para interacciones
  card.dataset.recipeId = recipe.id;

  return card;
}


// Nota: Similar a api.js, en un proyecto más grande usarías 'export { createRecipeCard };'
// y luego 'import { createRecipeCard } from './ui.js';' en main.js.