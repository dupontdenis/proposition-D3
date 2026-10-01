// 1. Votre fonction d'analyse du DOM
export function analyzeDOM() {
  const tags = [...document.querySelectorAll("body *")].map((el) =>
    el.tagName.toLowerCase(),
  );

  const total = tags.length;
  // Utilisation de Object.groupBy (disponible nativement dans les environnements modernes)
  const occur = Object.groupBy(tags, (t) => t);

  const tagMap = new Map();

  for (const [tag, list] of Object.entries(occur)) {
   
    const count = list.length;


    tagMap.set(tag, {
      tag,
      count,
    });
  }

  return [...tagMap.values()];
}
