/*!
* Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


// collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}


// FORMs


var nameInput = document.getElementById("name");
nameInput.oninput = function () {
    var fname = document.forms.formContact.fullName.value;
    var regName = /\d+/g;
    var nameElement = document.getElementById("namealert");
    if (fname == "" || regName.test(fname)) {
        nameElement.style.display = 'block';
    }
    else
        nameElement.style.display = 'none';
    enableSubmit();
}

var emailInput = document.getElementById("email");
emailInput.oninput = function () {
    var email = document.forms.formContact.email.value;
    var regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/g;     //Javascript reGex for Email Validation.
    var emailElement = document.getElementById("emailalert");
    if (email == "" || !regEmail.test(email)) {
        emailElement.style.display = 'block';
    }
    else
        emailElement.style.display = 'none';
    enableSubmit();
}

var phoneInput = document.getElementById("phone");
phoneInput.oninput = function () {
    var phone = document.forms.formContact.phone.value;
    var regPhone = /^\d{11}/g;                                           // Javascript reGex for Phone Number validation.
    var phoneElement = document.getElementById("phonealert");
    if (phone == "" || !regPhone.test(phone)) {
        phoneElement.style.display = 'block';
    }
    else
        phoneElement.style.display = 'none';
    enableSubmit();
}

enableSubmit = function () {
    var fname = document.forms.formContact.fullName.value;
    var email = document.forms.formContact.email.value;
    var phone = document.forms.formContact.phone.value;
    var nameElement = document.getElementById("namealert");
    var emailElement = document.getElementById("emailalert");
    var phoneElement = document.getElementById("phonealert");
    var submitButton = document.getElementById("submitButton");
    console.log(nameElement);
    if (fname == "" || email == "" || phone == "" || nameElement.style.display == 'block' || emailElement.style.display == 'block' || phoneElement.style.display == 'block') {
        submitButton.classList.add("disabled");
    }
    else
        submitButton.classList.remove("disabled")
}

window.addEventListener("load", function () {
    const form = document.getElementById('contactForm');
    const successElement = document.getElementById('submitSuccessMessage');
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(form);
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        })
            .then(() => {
                successElement.style.display = 'block';
                setTimeout(() => {
                    successElement.style.display = 'none';
                }, 5000);
            })
    });
});


