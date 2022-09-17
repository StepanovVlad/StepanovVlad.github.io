let Monet = [[10, 5.66],
	      [5,  6.16],
	      [2,  5.17],
	      [1, 3.16]
    ];  

class Kassa {
	constructor (Monets = [], id = 'kassa', clas = 'kassa') {
	this.id = id;
	this.class = clas;
	this.monets = this.getMonets(Monets);
	this.render();
	}
	getMonets (arr) {
		return  arr.map(item => new Monets(...item));
	}
	_count () {
		return this.monets.reduce((sum, item) => sum + item.sum(), 0);
	}
	render () {
		document.body.innerHTML = `<div id = ${this.id} 
			class = ${this.class}"></div>`;
		let block = document.getElementById('kassa');
		block.innerHTML +=`<input value = 'Вес' readonly><input value = 'Количество' readonly><input value = 'Итого' readonly>`
		for (let item of this.monets)
			block.innerHTML += item.render();
		block.innerHTML += `<div>Итого : ${this._count()}</div>`;
		this.onChange ();
	}
	onChange () {
		let block = document.getElementById('kassa');
		block.addEventListener("change", e => {
			let item = this.monets.find( item => item.id === +e.target.parentElement.id);
			item.weight = +e.target.value;
			console.log(+e.target.value, item);
			this.render();
			//console.log (e.target.parentElement)
		})
	}
}

class Monets {
	constructor (name, oneWeight, weight = 0){
		this.id = name;
		this.oneweight = oneWeight;
		this.weight = weight;
	}
	count () {
		return Math.round(this.weight / this.oneweight)
	}
	sum () {
		return this.id * this.count();
	}
	render () {
		return `<div id = "${this.id}" class = 'monet'>${this.id}<input	type = "number" value = '${this.weight}'>
		<input type = "number" value = '${this.count()}' readonly><input type = "number" value = '${this.sum()}' readonly></div>`
	}
}

const kassa = new Kassa (Monet);