async function loadData() {
  const q = document.getElementById('q').value;
  const region = document.getElementById('region').value;
  const mineral = document.getElementById('mineral').value;
  const category = document.getElementById('category').value;

  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (region) params.set('region', region);
  if (mineral) params.set('mineral', mineral);
  if (category) params.set('category', category);

  const res = await fetch(`/api/search?${params.toString()}`);
  const data = await res.json();

  const items = document.getElementById('items');
  items.innerHTML = '';

  data.items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <h3>${item.name}</h3>
      <div>Регион: ${item.region}</div>
      <div>Категория: ${item.category}</div>
      <div>Минерал: ${item.mineral}</div>
      <div>Код: ${item.code}</div>
      <div>Координаты: ${item.latitude}, ${item.longitude}</div>
    `;
    items.appendChild(div);
  });
}

document.getElementById('searchBtn').addEventListener('click', loadData);
loadData();
