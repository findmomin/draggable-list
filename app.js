var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// dom elements
var elements = {
    draggable_list: document.getElementById('draggable-list'),
    check: document.getElementById('check')
};
var richestPeople = [
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
var draggedEl;
// functions
var shuffleArr = function (arr) {
    var m = arr.length, t, i;
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
var renderNames = function () {
    var names = shuffleArr(__spreadArray([], richestPeople, true));
    names.forEach(function (name, i) {
        var markup = "\n      <li ondragover=\"event.preventDefault()\">\n        <span class=\"number\">" + (i + 1) + "</span>\n        <div class=\"draggable\" draggable=\"true\">\n          <p class=\"person-name\">" + name + "</p>\n          <i class=\"fas fa-grip-lines\" aria-hidden=\"true\"></i>\n        </div>\n      </li>\n    ";
        elements.draggable_list.insertAdjacentHTML('beforeend', markup);
    });
};
var checkOrder = function () {
    var userOder = __spreadArray([], elements.draggable_list.querySelectorAll('li'), true);
    userOder.forEach(function (user, i) {
        var name = user.querySelector('.person-name').textContent;
        if (i === richestPeople.indexOf(name))
            user.className = 'right';
        else
            user.className = 'wrong';
    });
};
var startDrag = function (e) {
    var _a;
    var target = e.target;
    draggedEl = target;
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/plain', target.querySelector('.person-name').textContent);
};
var endDrag = function (e) {
    var target = e.target.closest('li');
    var data = e.dataTransfer.getData('text/plain');
    target.classList.remove('over');
    draggedEl.querySelector('.person-name').textContent =
        target.querySelector('.person-name').textContent;
    target.querySelector('.person-name').textContent = data;
};
renderNames();
// event listeners
// check order
elements.check.addEventListener('click', checkOrder);
// drag handler
// start
elements.draggable_list.addEventListener('dragstart', startDrag);
// dragging over
elements.draggable_list.addEventListener('dragover', function (e) {
    return e.target.closest('li').classList.add('over');
});
// drag leave
elements.draggable_list.addEventListener('dragleave', function (e) {
    return e.target.closest('li').classList.remove('over');
});
// drop
elements.draggable_list.addEventListener('drop', endDrag);
