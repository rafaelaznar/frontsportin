# Frontsportin

Frontal para gesportin

## Estilos de listados (plists)

Los componentes `plist` deben compartir apariencia y comportarse igual en móviles:

1. Importar `src/app/component/shared/plist-styles.css` en cada CSS de plist.
2. Usar la clase `controls-row` para organizar paginación/RPP y el botón "nuevo".
3. Envolver la tabla con `<div class="table-responsive w-100">`.
4. Añadir `class="text-truncate-col"` a celdas de texto largo.
5. En pantallas ≤768px se ocultan columnas auxiliares automáticamente.

Así se garantiza una UI consistente y responsive en toda la aplicación.
