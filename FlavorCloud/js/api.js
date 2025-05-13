console.log("API Module Loaded");

// --- Simulación de API ---
// En un futuro, esta función podría hacer una llamada fetch a un servidor real.
// Por ahora, devuelve datos de ejemplo directamente.

function getSampleRecipes() {
  // Simula un pequeño retraso, como si fuera una llamada de red
  // (Opcional, solo para ver el efecto de carga si lo hubiera)
  // await new Promise(resolve => setTimeout(resolve, 100)); // Descomentar si quieres probar asincronía

  return [
    {
        id: 1,
        title: "Tacos al Pastor",
        description: "Deliciosos tacos marinados con achiote y especias, cocinados en trompo.",
        imageUrl: "assets/images/placeholder_recipe.jpg",
        author: "Chef Juan"
    },
    {
        id: 2,
        title: "Paella Valenciana Tradicional",
        description: "Arroz con conejo, pollo, judías verdes y garrofó. ¡La auténtica!",
        imageUrl: "assets/images/placeholder_recipe.jpg",
        author: "Chef María"
    },
    {
        id: 3,
        title: "Pizza Margherita Clásica",
        description: "Simple y deliciosa: tomate, mozzarella fresca, albahaca y aceite de oliva.",
        imageUrl: "assets/images/placeholder_recipe.jpg",
        author: "Chef Luigi"
    },
    {
        id: 4,
        title: "Ensalada César con Pollo",
        description: "Lechuga romana, pollo a la parrilla, crutones, parmesano y aderezo César casero.",
        imageUrl: "assets/images/placeholder_recipe.jpg",
        author: "Chef Ana"
    },
    {
        id: 5,
        title: "Sopa de Tortilla Azteca",
        description: "Caldo de tomate con tiras de tortilla frita, aguacate, queso y crema.",
        imageUrl: "assets/images/placeholder_recipe.jpg",
        author: "Chef Carlos"
    },
     {
        id: 6,
        title: "Lasaña Boloñesa Casera",
        description: "Capas de pasta, ragú de carne, bechamel y queso parmesano gratinado.",
        imageUrl: "assets/images/placeholder_recipe.jpg",
        author: "Chef Isabella"
    }
    // Puedes añadir más recetas aquí
  ];
}

// Nota: En un proyecto más grande, usarías 'export { getSampleRecipes };'
// y luego 'import { getSampleRecipes } from './api.js';' en main.js,
// pero para que funcione directamente con los <script> en HTML,
// la función queda disponible globalmente (o al menos para los scripts cargados después).