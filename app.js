fetch("inform.json")
  .then((res) => res.json())
  .then((jsonData) => {
    const stars = jsonData.starsPath.map((star) => {
      if (typeof star["star-path"] === "string") {
        star["star-path"] = star["star-path"].split(",").map((p) => p.trim());
      }
      return star;
    });

    const clickedStars = new Set(); // Нажатые звезды
    const pathUsageCount = new Map(); // Сколько раз каждый путь был использован

    stars.forEach((star) => {
      const starElement = document.getElementById(star.id);
      if (!starElement) return;

      // Наведение: показать инфо
      starElement.addEventListener("mouseenter", () => {
        const content = `
          <strong>${star["lesson-name"]}</strong><br/>
          Type: ${star["project-type"]}<br/>
          Complexity: ${star["complexity"]}<br/>
          XP: ${star["maxXp"]}
        `;
        showTooltip(starElement, content);
      });

      starElement.addEventListener("mouseleave", hideTooltip);

      // Клик по звезде
      starElement.addEventListener("click", () => {
        if (clickedStars.has(star.id)) return; // уже нажата — игнор
        clickedStars.add(star.id);

        // Сделать звезду активной визуально
        starElement.classList.add("star-active");

        star["star-path"].forEach((pathId) => {
          const pathElement = document.getElementById(pathId);
          if (!pathElement) return;

          // Увеличиваем количество использований пути
          const count = pathUsageCount.get(pathId) || 0;
          pathUsageCount.set(pathId, count + 1);

          // Применяем стили
          if (count === 0) {
            pathElement.classList.add("path-weak"); // только первый раз
          } else if (count === 1) {
            // Был уже один раз — теперь второй: значит общая связь
            pathElement.classList.remove("path-weak");
            pathElement.classList.add("path-strong");
          }
        });
      });
    });
  })
  .catch((err) => {
    console.error("Ошибка загрузки JSON:", err);
  });

function showTooltip(element, content) {
  const tooltip = document.getElementById("info");
  tooltip.innerHTML = content;
  tooltip.style.display = "block";

  const rect = element.getBoundingClientRect();
  tooltip.style.left = `${rect.right + 10}px`;
  tooltip.style.top = `${rect.top}px`;
}

function hideTooltip() {
  const tooltip = document.getElementById("info");
  tooltip.style.display = "none";
}
