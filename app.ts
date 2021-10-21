// dom elements
const elements = {
  draggable_list: document.getElementById('draggable-list') as HTMLUListElement,
  check: document.getElementById('check') as HTMLButtonElement,
};

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

let draggedEl: HTMLElement;

// functions
const shuffleArr = (arr: any[]) => {
  let m = arr.length,
    t: any,
    i: any;

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }

  return arr;
};

const renderNames = () => {
  const names = shuffleArr([...richestPeople]);

  names.forEach((name, i) => {
    const markup = `
      <li ondragover="event.preventDefault()">
        <span class="number">${i + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${name}</p>
          <i class="fas fa-grip-lines" aria-hidden="true"></i>
        </div>
      </li>
    `;

    elements.draggable_list.insertAdjacentHTML('beforeend', markup);
  });
};

const checkOrder = () => {
  const userOder = [...(elements.draggable_list.querySelectorAll('li') as any)];

  userOder.forEach((user, i) => {
    const name = user.querySelector('.person-name')!.textContent!;

    if (i === richestPeople.indexOf(name)) user.className = 'right';
    else user.className = 'wrong';
  });
};

const startDrag = (e: DragEvent) => {
  const target = e.target as HTMLElement;
  draggedEl = target;

  e.dataTransfer?.setData(
    'text/plain',
    target.querySelector('.person-name')!.textContent!
  );
};

const endDrag = (e: DragEvent) => {
  const target = (e.target as HTMLElement).closest('li')!;
  const data = e.dataTransfer!.getData('text/plain')!;

  target.classList.remove('over');
  draggedEl.querySelector('.person-name')!.textContent =
    target.querySelector('.person-name')!.textContent;
  target.querySelector('.person-name')!.textContent = data;
};

renderNames();

// event listeners
// check order
elements.check.addEventListener('click', checkOrder);

// drag handler
// start
elements.draggable_list.addEventListener('dragstart', startDrag);

// dragging over
elements.draggable_list.addEventListener('dragover', e =>
  (e.target as HTMLElement).closest('li')!.classList.add('over')
);

// drag leave
elements.draggable_list.addEventListener('dragleave', e =>
  (e.target as HTMLElement).closest('li')!.classList.remove('over')
);

// drop
elements.draggable_list.addEventListener('drop', endDrag);
