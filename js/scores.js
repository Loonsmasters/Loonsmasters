const availableYears = ["2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003"]; // <- you can add more years here later

async function loadScores(year = "2012") {
  const container = document.getElementById('scores-container');
  container.innerHTML = ""; // Clear previous content

  const response = await fetch(`scores/${year}.json`);
  const data = await response.json();

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

// Populate dropdown
function populateYearDropdown() {
  const select = document.getElementById('year-select');
  availableYears.sort((a, b) => b - a); // Sort descending
  availableYears.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    select.appendChild(option);
  });
}

// Change year
function changeYear(year) {
  loadScores(year);
}

// On page load
populateYearDropdown();
loadScores();
