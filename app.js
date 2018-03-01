$(document).ready(function() {

	var image = '<div class="column is-one-third-desktop"><div class="card"><div class="card-image"><figure class="image"><img src="{{message}}" alt="image"></figure></div><header class="card-header"><p class="card-header-title"><span class="icon"><i class="fa fa-{{gender}}"></i></span>{{sender}}</p></header>'
	image = image + '<footer class="card-footer"><span class="card-footer-item"><time>{{time}}</time></span></footer>'
	image = image + '</div></div>'

	var template = '<div class="column is-one-third-desktop"><div class="card"><header class="card-header"><p class="card-header-title"><span class="icon"><i class="fa fa-{{gender}}"></i></span>{{sender}}</p></header>'
	template = template + '<div class="card-content"><div class="content">{{message}}</div></div>'
	template = template + '<footer class="card-footer"><span class="card-footer-item">#{{number}}</span><span class="card-footer-item"><time>{{time}}</time></span></footer>'
	template = template + '</div></div>'

	// thx Crescent Fresh; https://stackoverflow.com/a/1500501
	var urlify = function(text) {
		var urlRegex = /(https?:\/\/[^\s]+)/g;
		return text.replace(urlRegex, function(url) {
			return '<a target="_blank" class="is-link" href="' + url + '">' + url + '</a>';
		})
		// or alternatively
		// return text.replace(urlRegex, '<a href="$1">$1</a>')
	}

	var box = $("#messages");
	var log = $("#log");

	$.getJSON('data.json', function(data) {
		var time = data['time'];
		console.log(time);

		var messages = data['messages'];

		$(messages).each(function(i, e) {
			var t = template;
			if (e[4] == "image") {
				t = image;
			}

			if (e[5] == true) {
				t = t.replace("{{sender}}", "<strike title=\"rest in peace\">" + e[0] + "</strike>");
			} else {
				t = t.replace("{{sender}}", e[0]);
			}

			if (e[4] == "image") {
				t = t.replace("{{message}}", e[2]);
			} else {
				t = t.replace("{{message}}", urlify(e[2]));
			}

			t = t.replace("{{time}}", e[3]);
			if (e[1] == "Male") {
				t = t.replace("{{gender}}", "mars");
			} else if (e[1] == "Female"){
				t = t.replace("{{gender}}", "venus");
			} else {
				t = t.replace("{{gender}}", "circle");
			}

			t =  t.replace("{{number}}", i+1);

			box.prepend($(t));
		});

		log.text("last updated: " + time);
	});
});
