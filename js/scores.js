async function loadScores(year = "2012") {
  const response = await fetch(`scores/${year}.json`);
  const data = await response.json();

  const container = document.getElementById('scores-container');

  const title = document.createElement('h2');
  title.innerText = `${year} Scores`;
  title.className = 'section-title';
  container.appendChild(title);

  data.sections.forEach(section => {
    const sectionTitle = document.createElement('h3');
    sectionTitle.innerText = section.title;
    sectionTitle.className = 'section-title';
    container.appendChild(sectionTitle);

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    section.headers.forEach(headerText => {
      const th = document.createElement('th');
      th.innerText = headerText;
      headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    section.rows.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(cell => {
        const td = document.createElement('td');
        td.innerText = cell;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    container.appendChild(table);
  });
}

loadScores();
