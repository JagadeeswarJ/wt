// week3.js - Dynamically load book details into the content frame

document.addEventListener('DOMContentLoaded', function () {
	// This script runs inside the navigation frame (navigation.html)
	var navLinks = document.querySelectorAll('a[data-book-id]');
	if (!navLinks.length) {
		return;
	}

	var bookData = {
		'dune': {
			title: 'Dune',
			author: 'Frank Herbert',
			category: 'Science Fiction',
			price: '$14',
			isbn: '978-0441013593',
			availability: 'In Stock',
			description: 'A sweeping epic set on the desert planet Arrakis, exploring politics, religion, and ecology through the journey of Paul Atreides.'
		},
		'educated': {
			title: 'Educated',
			author: 'Tara Westover',
			category: 'Biography / Memoir',
			price: '$16',
			isbn: '978-0399590504',
			availability: 'In Stock',
			description: 'A memoir about a woman who grows up in a survivalist family in Idaho and goes on to earn a PhD from Cambridge University.'
		},
		'midnight-library': {
			title: 'The Midnight Library',
			author: 'Matt Haig',
			category: 'Literary Fiction',
			price: '$13',
			isbn: '978-0525559474',
			availability: 'Limited Stock',
			description: 'Between life and death lies a library where every book represents a different life you could have lived.'
		},
		'project-hail-mary': {
			title: 'Project Hail Mary',
			author: 'Andy Weir',
			category: 'Science Fiction',
			price: '$17',
			isbn: '978-0593135204',
			availability: 'Out of Stock',
			description: 'An astronaut wakes up alone in deep space with no memory, tasked with saving Earth from an extinction-level threat.'
		}
	};

	function loadBookIntoContentFrame(bookId) {
		var info = bookData[bookId];
		if (!info) {
			return;
		}

		var contentFrame = parent.frames['contentFrame'];
		if (!contentFrame || !contentFrame.document) {
			return;
		}

		var doc = contentFrame.document;
		var container = doc.getElementById('bookDetails');
		if (!container) {
			return;
		}

		container.innerHTML =
			'<h3>' + info.title + '</h3>' +
			'<p><strong>Author:</strong> ' + info.author + '</p>' +
			'<p><strong>Category:</strong> ' + info.category + '</p>' +
			'<p><strong>ISBN:</strong> ' + info.isbn + '</p>' +
			'<p><strong>Price:</strong> ' + info.price + '</p>' +
			'<p><strong>Availability:</strong> ' + info.availability + '</p>' +
			'<p><strong>Description:</strong> ' + info.description + '</p>';
	}

	navLinks.forEach(function (link) {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			var bookId = this.getAttribute('data-book-id');
			loadBookIntoContentFrame(bookId);
		});
	});
});
