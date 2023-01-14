var Student = /** @class */ (function () {
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = "".concat(firstName, " ").concat(lastName);
    }
    return Student;
}());
var arr = [4, 6, 3, 33, 6];
var displayArray = arr.map(function (e) {
    var arrEl = document.createElement('p');
    arrEl.textContent = String(e);
    return arrEl;
});
displayArray.forEach(function (e) {
    document.body.appendChild(e);
});
