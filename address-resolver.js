/**
 * 
 * @authors summer_last (sunxzg@gmail.com)
 * @date    2016-11-21 09:07:42
 * @version $Id$
 */

function AR() {
	this.href = location.href;
}
AR.prototype = {
	constructor: AR,
	logger: function(msg){
		//console.log(msg);
	},
	getObj: function() {
		return this.mapToObj(this.getMap());
	},
	getMap: function() {
		return this.buildMap(this.href);
	},
	buildMap: function(str) {
		let map = new Map();
		let deaf = new Map();
		let i1 = str.indexOf('?');
		if (i1 > -1) {
			str = str.substring(i1 + 1);
			i1 = str.indexOf('&');
			if (i1 > -1) {
				let arr1 = str.split('&');
				for (let a of arr1) {
					i1 = str.indexOf('=');
					//必须要有key
					if (i1 > 0) {
						let aStr = a.split('=');
						let key = aStr[0];
						let val = decodeURI(aStr[1]);
						if (map.get(key) == undefined) {
							let arr = [];
							arr.push(val);
							map.set(key, arr);
						} else {
							map.get(key).push(val);
						}
					} else {
						throw new Error('键值不匹配');
					}
				}
			} else {
				i1 = str.indexOf('=');
				//必须要有key
				if (i1 > 0) {
					let aStr = str.split('=');
					let key = aStr[0];
					let val = aStr[1];
					let arr = [];
					arr.push(val);
					map.set(key, arr);
				} else {
					return deaf;
				}

			}
			return map;
		} else {
			return deaf;
		}
	},
	mapToObj: function(map) {
		let obj = Object.create(null);
		for (let [k, v] of map) {
			if (v.length < 2) {
				v = v[0];
			}
			obj[k] = v;
		}
		return obj;
	}
}

