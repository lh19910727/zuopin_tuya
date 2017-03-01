(function() {
		var Html = document.getElementsByTagName('html')[0];
		var Width = document.documentElement.clientWidth;
		Width = Width >540? 540 : Width;
		Html.style.fontSize = Width / 15 + 'px';
	})();
/*设置储存的值*/
	function setsessionStorage(keys, value) {
		if(sessionStorage) {
			var jsom = sessionStorage['jsom'];
			var mp = {};
			if(jsom && jsom != '') {
				mp = JSON.parse(jsom);
			}
			mp[keys] = value;
			jsom = JSON.stringify(mp);
			sessionStorage['jsom'] = jsom;
		}
		return '';
	}
	/*获取储存的值*/
	function getsessionStorage(keys) {
		if(sessionStorage && sessionStorage['jsom'] != undefined) {
			var jsom = sessionStorage['jsom'];
			if(jsom && jsom != '') {
				var mp = JSON.parse(jsom);
				if(mp[keys] && mp[keys] != '') {
					return mp[keys];
				} else {
					return "";
				}
			}
		} else {
			return "";
		}
	}
